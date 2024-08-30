import { IBike } from "./IBike";
import { IUserData } from "./IUser";

export interface IRental {
    _id: string;
    userId: IUserData;
    bikeId: IBike;
    startTime: Date;
    returnTime: Date;
    totalCost: number;
    isReturned: boolean;
    bookingPayment: 'paid' | 'unpaid'
    
}
