export interface ICoupon {
    _id: string
    code: string;
    discountValue: number
    isActive: boolean
    expirationDate: Date | string
}
