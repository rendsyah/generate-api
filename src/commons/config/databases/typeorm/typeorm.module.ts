import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from './typeorm.config';

@Module({
    imports: [TypeOrmModule.forRootAsync(TypeOrmConfigAsync)],
})
export class TypeOrmConfigModule {}
