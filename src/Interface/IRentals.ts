import { IBike } from "./IBike";

export interface IRental {
    _id: string;
    userId: string;
    bikeId: string | IBike[];
    startTime: Date;
    returnTime: Date;
    totalCost: number;
    isReturned: boolean;
    bookingPayment: 'paid' | 'unpaid'
    
}
