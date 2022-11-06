import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allocation } from './models/allocation.entity';
import { IInsertAllocation } from './allocations.interface';

@Injectable()
export class AllocationsRepository {
    constructor(@InjectRepository(Allocation) private readonly allocationRepository: Repository<Allocation>) {}

    public async insertAllocation(params: IInsertAllocation) {
        return await this.allocationRepository.save(params);
    }
}
