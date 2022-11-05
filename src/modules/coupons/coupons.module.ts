import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponsController } from './coupons.controller';
import { CouponsRepository } from './coupons.repository';
import { CouponsService } from './coupons.service';
import { ModelsRepository } from './schemas/models.schema';

@Module({
    imports: [MongooseModule.forFeature(ModelsRepository)],
    controllers: [CouponsController],
    providers: [CouponsService, CouponsRepository],
})
export class CouponsModule {}
