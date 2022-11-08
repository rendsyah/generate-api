import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponsDocument = HydratedDocument<Coupons>;

@Schema({ timestamps: true })
export class Coupons {
    @Prop({ default: '' })
    filename: string;

    @Prop({ unique: true, required: true })
    coupon: string;

    @Prop({ default: 0 })
    length: number;

    @Prop({ default: 0 })
    prizeId: number;

    @Prop({ required: true })
    status: number;

    @Prop({ default: null })
    used_date: Date;

    @Prop({ default: 0 })
    is_deleted: number;

    @Prop({ default: null })
    deleted_at: Date;
}

export const CouponsSchema = SchemaFactory.createForClass(Coupons);
