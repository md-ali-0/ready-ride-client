
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateProps {
    code: string | null;
    discountValue: number | null
    isActive: boolean | null
    expirationDate: Date | null
}

const initialState: InitialStateProps = {
    code: null,
    discountValue: null,
    isActive: null,
    expirationDate: null
};

export const couponSlice = createSlice({
    name: "couponData",
    initialState,
    reducers: {
        setcouponData: (state, action: PayloadAction<InitialStateProps>) => {
            const { code, discountValue, isActive, expirationDate  } = action.payload;
            state.code = code;
            state.discountValue = discountValue;
            state.isActive = isActive;
            state.expirationDate = expirationDate;
        },

        removecouponData: (state) => {
            state.code = null;
            state.discountValue = null;
            state.isActive = null;
            state.expirationDate = null;
        },
    },
});

export const { setcouponData, removecouponData } = couponSlice.actions;

export default couponSlice.reducer;
