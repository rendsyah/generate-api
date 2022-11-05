import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSchema } from './commons/config/typeorm/database.config';
import { TypeOrmConfigAsync } from './commons/config/typeorm/typeorm.config';
import { AllocationsModule } from './modules/allocations/allocations.module';
import { CouponsModule } from './modules/coupons/coupons.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: DatabaseSchema,
            cache: true,
        }),
        TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
        AllocationsModule,
        CouponsModule,
    ],
})
export class AppModule {}
