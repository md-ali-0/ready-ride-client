
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateProps {
    bikeId?: string | null;
    startTime?: string | null;
    amount?: number | null
    isBooking?: boolean | null
    totalCost?: number | null
    dicountCost?: number | null
}

const initialState: InitialStateProps = {
    bikeId: null,
    startTime: null,
    amount: 0,
    isBooking: false,
    totalCost: null,
    dicountCost: null
};

export const rentalSlice = createSlice({
    name: "rentalData",
    initialState,
    reducers: {
        setRentalData: (state, action: PayloadAction<InitialStateProps>) => {
            const { bikeId, startTime, amount, isBooking  } = action.payload;
            state.bikeId = bikeId;
            state.startTime = startTime;
            state.amount = amount;
            state.isBooking = isBooking;
        },

        removeRentalData: (state) => {
            state.bikeId = null;
            state.startTime = null;
            state.amount = null;
            state.isBooking = null;
        },
    },
});

export const { setRentalData, removeRentalData } = rentalSlice.actions;

export default rentalSlice.reducer;
