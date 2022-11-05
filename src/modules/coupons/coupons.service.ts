import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import * as root from 'app-root-path';
import * as csv from 'csv-parse';
import * as moment from 'moment';

import { ICouponsData } from './coupons.interface';

@Injectable()
export class CouponsService {
    constructor() {}

    async generateCoupons() {
        const resultData: ICouponsData[] = [];
        const getCoupons = fs.readdirSync(`${root}/../imports/coupons`);

        if (getCoupons.length === 0) {
            return new NotFoundException('file not exists');
        }

        for (let index = 0; index < getCoupons.length; index++) {
            const fileCoupon = getCoupons[index];
            fs.createReadStream(`${root}/../imports/coupons/${fileCoupon}`)
                .pipe(csv.parse({ columns: true }))
                .on('error', (err) => console.log(err))
                .on('data', (row) => resultData.push(row))
                .on('end', async () => {
                    if (resultData.length === 0) {
                        return new NotFoundException('data allocation not exists');
                    }

                    console.log('insert data on process');
                    await this._processCoupons(resultData);

                    return;
                });
        }
    }

    async downloadCoupons() {
        const downloadPath = `${root}/downloads/template_coupon.csv`;
        const downloadStream = fs.createReadStream(downloadPath);

        return new StreamableFile(downloadStream);
    }

    private async _processCoupons(params: ICouponsData[]) {
        for (let index = 0; index < params.length; index++) {
            const coupon = params[index].coupon;
            const promoId = +params[index].promoId;
            const periodeId = +params[index].periodeId;

            const insertCoupon = {
                coupon,
                promoId,
                periodeId,
                status: 0,
                used_date: null,
                is_deleted: 0,
                deleted_at: null,
                created_at: moment().unix(),
                updated_at: moment().unix(),
            };
        }
    }
}
