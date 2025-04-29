import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity('Carritos_Abandonados')
export class CartsEntity{
    @PrimaryColumn({name: 'ID_Carrito_Abandonado', type: 'varchar', length: 50})
    id: string;

    @Column({ name: 'Fecha', type: 'date' })
    fechaCarrito: Date;

    @Column({ name: 'Email', type: 'varchar', length: 100 })
    email: string;
}