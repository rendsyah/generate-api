import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationsController } from './allocations.controller';
import { AllocationsRepository } from './allocations.repository';
import { AllocationsService } from './allocations.service';
import { ModelsRepository } from './models/models.entity';

@Module({
    imports: [TypeOrmModule.forFeature(ModelsRepository)],
    controllers: [AllocationsController],
    providers: [AllocationsRepository, AllocationsService],
})
export class AllocationsModule {}
