import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Allocation } from './models/allocation.entity';
import { IInsertAllocation } from './allocations.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AllocationsRepository {
    constructor(@InjectRepository(Allocation) private readonly allocationRepository: Repository<Allocation>) {}

    async insertAllocation(params: IInsertAllocation) {
        return await this.allocationRepository.save(params);
    }
}
