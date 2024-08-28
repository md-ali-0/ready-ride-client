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
    address: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
}
