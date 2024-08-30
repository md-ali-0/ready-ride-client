import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../Interface/IUser";
import { RootState } from "../../store";

export interface InitialStateProps {
    user: IUser | null;
    token: string | null;
}

const initialState: InitialStateProps = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<InitialStateProps>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
