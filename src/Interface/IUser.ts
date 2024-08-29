export interface IUser {
    user: string;
    role: string;
    iat: number;
    exp: number;
}

export interface IUserData {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    avatar?: string;
    address: string;
    isAvailable: boolean;
    role: "admin" | "user";
    createdAt: Date;
    updatedAt: Date;
}
