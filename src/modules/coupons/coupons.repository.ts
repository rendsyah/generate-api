import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupons, CouponsDocument } from './schemas/coupon.schema';
import { IInsertCoupons } from './coupons.interface';

@Injectable()
export class CouponsRepository {
    constructor(@InjectModel(Coupons.name) private readonly couponModel: Model<CouponsDocument>) {}

    async insertCoupon(params: IInsertCoupons) {
        const createdCoupon = new this.couponModel(params);
        return createdCoupon.save();
    }
}
