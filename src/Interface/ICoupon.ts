export interface ICoupon {
    _id: string
    code: string;
    color: string;
    discountValue: number
    isActive: boolean
    expirationDate: Date | string
}
