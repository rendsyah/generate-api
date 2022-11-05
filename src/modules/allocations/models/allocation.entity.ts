import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Allocation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: null })
    prizeId: number;

    @Column({ type: 'datetime', nullable: true, default: null })
    allocation_date: string;
}
