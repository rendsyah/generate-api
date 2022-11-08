import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as root from 'app-root-path';
import * as csv from 'csv-parse';
import * as moment from 'moment';
import { IAllocations } from './allocations.interface';
import { AllocationsRepository } from './allocations.repository';

@Injectable()
export class AllocationsService {
    constructor(private readonly config: ConfigService, private readonly allocationRepository: AllocationsRepository) {}

    private async _processAllocations(params: IAllocations[]) {
        let countLoop = 0;
        let errorData = [];

        for (let index = 0; index < params.length; index++) {
            const date = moment(params[index].date).format('YYYY-MM-DD');
            const prizeLoop = +params[index].prizeLoop;
            const prizeId = +params[index].prizeId;

            while (countLoop < prizeLoop) {
                countLoop++;
                const insertAllocation = {
                    prizeId: prizeId,
                    allocation_date: date,
                };

                await this.allocationRepository
                    .insertAllocation(insertAllocation)
                    .then(() => console.log(`insert allocation success: prizeId: ${prizeId} - date: ${date}`))
                    .catch((err) => {
                        errorData.push(insertAllocation);
                        console.log(`insert allocation error: prizeId: ${prizeId} - date: ${date}`);
                    });

                if (countLoop === prizeLoop) {
                    countLoop = 0;
                    break;
                }
            }
        }

        if (errorData.length > 0) {
            const getPathErrors = this.config.get('PATH_ERRORS');
            const createError = fs.createWriteStream(`${root}/..${getPathErrors}/error-allocations.txt`);
            createError.write(JSON.stringify(errorData));
            createError.end();
        }
    }

    async generateAllocations() {
        const allocations: IAllocations[] = [];
        const getPathAllocations = this.config.get('PATH_ALLOCATIONS');
        const getAllocations = fs.readdirSync(`${root}/..${getPathAllocations}`);

        if (getAllocations.length === 0) {
            return new NotFoundException('file not exists');
        }

        for (let index = 0; index < getAllocations.length; index++) {
            const fileAllocation = getAllocations[index];
            fs.createReadStream(`${root}/../imports/allocations/${fileAllocation}`)
                .pipe(csv.parse({ columns: true }))
                .on('error', (err) => console.log(err))
                .on('data', async (rows) => {
                    allocations.push(rows);

                    if (allocations.length === 1000) {
                        await this._processAllocations(allocations);
                        allocations.splice(0, allocations.length);
                    }
                    if (allocations.length === 1) {
                        await this._processAllocations(allocations);
                        allocations.splice(0, allocations.length);
                    }
                })
                .on('end', () => {
                    if (allocations.length === 0) {
                        return new NotFoundException('data allocation not exists');
                    }
                    return;
                });
        }
    }

    async downloadAllocations() {
        const downloadPath = `${root}/downloads/template_allocation.csv`;
        const downloadStream = fs.createReadStream(downloadPath);

        return new StreamableFile(downloadStream);
    }
}
