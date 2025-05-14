import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * This interceptor ensures that all responses follow json-server format.
 * Instead of wrapping arrays in objects, it returns arrays directly like json-server does.
 */
@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseFormatInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const request = context.switchToHttp().getRequest();
        const url = request.url;
        const method = request.method;
        
        this.logger.debug(`Processing response for ${method} ${url}`);
        
        // Don't modify the response if it's null or undefined
        if (data === null || data === undefined) {
          return data;
        }
        
        // Map endpoints to their expected resource names
        const endpointToResourceMap = {
          '/clientes': 'clientes',
          '/pedidos': 'pedidos',
          '/productos': 'productos',
          '/carts': 'carts',
          '/coupons': 'coupons'
        };
        
        // Get base path without query parameters
        const basePath = '/' + url.split('/')[1].split('?')[0];
        const resourceName = endpointToResourceMap[basePath] || basePath.substring(1);
        
        this.logger.debug(`Base path: ${basePath}, Resource name: ${resourceName}`);
        
        // For json-server compatibility: UNWRAP arrays from their container objects
        if (typeof data === 'object' && !Array.isArray(data)) {
          // If the response has a property matching our expected resource name
          // and that property is an array, return the array directly
          for (const [endpoint, resource] of Object.entries(endpointToResourceMap)) {
            if (data[resource] !== undefined && Array.isArray(data[resource])) {
              this.logger.debug(`Unwrapping ${resource} array from response object to match json-server format`);
              return data[resource]; // Return the array directly, not wrapped
            }
          }
        }
          // Special cases that shouldn't be modified
        const skipProcessing = url.includes('clients-per-product') || 
                              url.includes('api-status') || 
                              url === '/';
        
        if (skipProcessing) {
          this.logger.debug(`Skipping processing for special endpoint ${url}`);
          return data;
        }
        
        // For individual resource endpoints (like /clientes/1), return as is
        const isIndividualResource = url.split('/').length > 2 && !url.includes('?');
        if (isIndividualResource) {
          this.logger.debug(`Individual resource detected, returning as is`);
          return data;
        }
        
        // For arrays, return them directly (json-server style)
        if (Array.isArray(data)) {
          this.logger.debug(`Returning array response directly (json-server style)`);
          return data;
        }
        
        return data;
      }),
    );
  }
}
