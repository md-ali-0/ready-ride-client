export interface IBike {
    _id: string;
    name: string;
    image: string | null;
    description: string;
    pricePerHour: number | string;
    cc: number | string;
    year: number | string;
    isAvailable: boolean;
    model: string;
    brand: string;
    isFeatured: boolean | string;
    createdAt: Date;
    updatedAt: Date;
}
