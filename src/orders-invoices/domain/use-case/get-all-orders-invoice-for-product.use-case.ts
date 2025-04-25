import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, Product } from '../../data/entities/orders-invoices.entity';
import { OrderInvoiceProductTypeModel } from '../models/order-invoice-product-type-model';

@Injectable()
export class GetAllOrdersInvoiceForProductUseCase {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
  
  async execute(): Promise<OrderInvoiceProductTypeModel[]> {
    const orders = await this.getAllOrders();
    const products = await this.getAllProducts();
    
    const result: OrderInvoiceProductTypeModel[] = [];
    
    const allCategories = new Set<string>();
    products.forEach(p => {
      if (p.categoria) allCategories.add(p.categoria.trim());
    });
    
    const productsBySku = new Map<string, Product>();
    products.forEach(product => {
      productsBySku.set(product.sku, product);
    });
    
    const productsByCategory = this.groupProductsByCategory(products);
    
    for (const category in productsByCategory) {
      const categoryProducts = productsByCategory[category];
      
      let totalInvoice = 0;
      let totalOrders = 0;
      let categoryDate = '';
      
      for (const order of orders) {
        if (!order.productosSku) continue;
        
        const orderSkus = order.productosSku
          .split(/[,/]/)
          .map(sku => sku.trim())
          .filter(sku => sku.length > 0);
        
        const orderProductsInCategory = this.filterProductsByCategory(orderSkus, categoryProducts);
        
        if (orderProductsInCategory.length > 0) {
          if (!categoryDate) {
            categoryDate = new Date(order.fechaPedido).getFullYear().toString();
          }
          
          const discountPercentage = this.calculateDiscountPercentage(order);
          
          for (const sku of orderProductsInCategory) {
            const product = productsBySku.get(sku);
            if (product) {
              const priceWithDiscount = product.precio * (1 - discountPercentage);
              totalInvoice += priceWithDiscount;
              totalOrders += 1;
            }
          }
        }
      }
      
      if (!categoryDate) {
        categoryDate = new Date().getFullYear().toString();
      }
      
      result.push(new OrderInvoiceProductTypeModel(
        category + categoryDate,
        categoryDate,
        category,
        totalInvoice.toFixed(2),
        totalOrders.toString()
      ));
    }
    
    return result;
  }
  
  private groupProductsByCategory(products: Product[]): Record<string, Product[]> {
    const categories: Record<string, Product[]> = {};
    
    for (const product of products) {
      if (!product.categoria) continue;
      
      const categoryName = product.categoria.trim();
      
      if (!categories[categoryName]) {
        categories[categoryName] = [];
      }
      
      categories[categoryName].push(product);
    }
    
    return categories;
  }
  
  private filterProductsByCategory(orderSkus: string[], categoryProducts: Product[]): string[] {
    const categorySkuSet = new Set(categoryProducts.map(p => p.sku));
    
    return orderSkus.filter(sku => categorySkuSet.has(sku));
  }
  
  private calculateDiscountPercentage(order: Order): number {
    if (!order.totalPedido || order.totalPedido <= 0) {
      return 0;
    }
    
    let discountValue: number = 0;
    
    if (order.totalDescuento === null || order.totalDescuento === undefined) {
      discountValue = 0;
    } else if (typeof order.totalDescuento === 'number') {
      discountValue = order.totalDescuento;
    } else if (typeof order.totalDescuento === 'string') {
      const stringValue = String(order.totalDescuento);
      try {
        discountValue = parseFloat(stringValue.replace(',', '.'));
        if (isNaN(discountValue)) {
          discountValue = 0;
        }
      } catch (error) {
        discountValue = 0;
      }
    }
    return discountValue / order.totalPedido;
  }
}