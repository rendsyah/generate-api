export interface ICoupons {
    coupon: string;
    promoId?: number;
    periodeId?: number;
}

export interface IInsertCoupons {
    filename: string;
    coupon: string;
    length: number;
    status: number;
}
