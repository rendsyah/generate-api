export interface IAllocations {
    date: Date;
    prizeLoop: number;
    prizeId: number;
}

export interface IInsertAllocation {
    prizeId: number;
    allocation_date: string;
}
