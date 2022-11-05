import { Controller, Get, Header } from '@nestjs/common';
import { AllocationsService } from './allocations.service';

@Controller('/api/allocations')
export class AllocationsController {
    constructor(private allocationsService: AllocationsService) {}

    @Get()
    async generateAllocationsController() {
        return await this.allocationsService.generateAllocations();
    }

    @Get('/download')
    @Header('Content-type', 'application/csv')
    @Header('Content-Disposition', 'attachment; filename="template_coupon.csv"')
    async downloadAllocationsController() {
        return await this.allocationsService.downloadAllocations();
    }
}
