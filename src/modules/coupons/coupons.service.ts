import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as root from 'app-root-path';
import * as csv from 'csv-parse';
import * as moment from 'moment';
import { ICoupons } from './coupons.interface';
import { CouponsRepository } from './coupons.repository';

@Injectable()
export class CouponsService {
    constructor(private config: ConfigService, private couponsRepository: CouponsRepository) {}

    async generateCoupons() {
        const coupons: ICoupons[] = [];
        const getPathCoupons = this.config.get('PATH_COUPONS');
        const getCoupons = fs.readdirSync(`${root}/..${getPathCoupons}`);

        if (getCoupons.length === 0) {
            return new NotFoundException('file not exists');
        }

        for (let index = 0; index < getCoupons.length; index++) {
            const fileCoupon = getCoupons[index];
            fs.createReadStream(`${root}/../imports/coupons/${fileCoupon}`)
                .pipe(csv.parse({ columns: true }))
                .on('error', (err) => console.log(err))
                .on('data', (row) => coupons.push(row))
                .on('end', async () => {
                    if (coupons.length === 0) {
                        return new NotFoundException('data allocation not exists');
                    }

                    await this._processCoupons(coupons);
                    return;
                });
        }
    }

    async downloadCoupons() {
        const downloadPath = `${root}/downloads/template_coupon.csv`;
        const downloadStream = fs.createReadStream(downloadPath);

        return new StreamableFile(downloadStream);
    }

    private async _processCoupons(params: ICoupons[]) {
        const errorData = [];

        for (let index = 0; index < params.length; index++) {
            const coupon = params[index].coupon;
            const promoId = params[index]?.promoId;
            const periodeId = params[index]?.periodeId;

            const insertCoupon = {
                filename: '',
                coupon: coupon,
                length: coupon.length,
                status: 0,
            };

            await this.couponsRepository
                .insertCoupon(insertCoupon)
                .then(() => console.log(`insert allocation success: coupon: ${coupon}`))
                .catch((err) => {
                    errorData.push(coupon);
                    console.log(`insert allocation failed: coupon: ${coupon}`);
                });
        }

        if (errorData.length > 0) {
            const getPathErrors = this.config.get('PATH_ERRORS');
            const createError = fs.createWriteStream(`${root}/..${getPathErrors}/error-coupons.txt`);
            createError.write(errorData);
            createError.end();
        }
    }
}
