import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import * as root from 'app-root-path';
import * as csv from 'csv-parse';
import * as moment from 'moment';
import { IAllocations } from './allocations.interface';
import { AllocationsRepository } from './allocations.repository';

@Injectable()
export class AllocationsService {
    constructor(private readonly allocationRepository: AllocationsRepository) {}

    async generateAllocations() {
        const allocations: IAllocations[] = [];
        const getAllocations = fs.readdirSync(`${root}/../imports/allocations`);

        if (getAllocations.length === 0) {
            return new NotFoundException('file not exists');
        }

        for (let index = 0; index < getAllocations.length; index++) {
            const fileAllocation = getAllocations[index];
            fs.createReadStream(`${root}/../imports/allocations/${fileAllocation}`)
                .pipe(csv.parse({ columns: true }))
                .on('error', (err) => console.log(err))
                .on('data', (rows) => allocations.push(rows))
                .on('end', async () => {
                    if (allocations.length === 0) {
                        return new NotFoundException('data allocation not exists');
                    }

                    await this._processAllocations(allocations);
                    return;
                });
        }
    }

    async downloadAllocations() {
        const downloadPath = `${root}/downloads/template_allocation.csv`;
        const downloadStream = fs.createReadStream(downloadPath);

        return new StreamableFile(downloadStream);
    }

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
                    .catch(() => {
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
            const createError = fs.createWriteStream(`${root}/../imports/errors/error.txt`);
            createError.write(errorData);
            createError.end();
        }
    }
}
