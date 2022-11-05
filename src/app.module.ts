import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigModule } from './commons/config/databases/mongoose/mongoose.module';
import { TypeOrmConfigModule } from './commons/config/databases/typeorm/typeorm.module';
import { validate } from './commons/config/databases/database.config';
import { AllocationsModule } from './modules/allocations/allocations.module';
import { CouponsModule } from './modules/coupons/coupons.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, cache: true, validate }), MongooseConfigModule, TypeOrmConfigModule, AllocationsModule, CouponsModule],
})
export class AppModule {}
