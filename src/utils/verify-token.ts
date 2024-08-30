import { IUser } from "@/interface/IUser";
import { jwtDecode } from "jwt-decode";

const verifyToken = (token: string) => {
    const decoded : IUser = jwtDecode(token);
    return decoded;
};

export default verifyToken;
