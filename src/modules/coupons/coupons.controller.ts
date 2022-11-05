import { Controller, Get, Header } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('/api/coupons')
export class CouponsController {
    constructor(private couponsService: CouponsService) {}

    @Get()
    async generateCouponsController() {
        return await this.couponsService.generateCoupons();
    }

    @Get('/download')
    @Header('Content-type', 'application/csv')
    @Header('Content-Disposition', 'attachment; filename="template_coupon.csv"')
    async downloadCouponsController() {
        return await this.couponsService.downloadCoupons();
    }
}
