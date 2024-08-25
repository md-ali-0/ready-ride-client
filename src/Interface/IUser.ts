export interface IUser {
    user: string;
    role: string;
    iat: number;
    exp: number;
}

export interface IUserData {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    address?: string;
    passwordChangeAt?: Date;
    role: "superAdmin" | "admin" | "user";
    status: "active" | "blocked";
    isDeleted: boolean;
}
