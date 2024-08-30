import { jwtDecode } from "jwt-decode";
import { IUser } from "../Interface/IUser";

const verifyToken = (token: string) => {
    const decoded : IUser = jwtDecode(token);
    return decoded;
};

export default verifyToken;
