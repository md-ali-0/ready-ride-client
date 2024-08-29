
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateProps {
    bikeId: string | null;
    startTime: string | null;
}

const initialState: InitialStateProps = {
    bikeId: null,
    startTime: null,
};

export const rentalSlice = createSlice({
    name: "rentalData",
    initialState,
    reducers: {
        setRentalData: (state, action: PayloadAction<InitialStateProps>) => {
            const { bikeId, startTime } = action.payload;
            state.bikeId = bikeId;
            state.startTime = startTime;
        },
        removeRentalData: (state) => {
            state.bikeId = null;
            state.startTime = null;
        },
    },
});

export const { setRentalData, removeRentalData } = rentalSlice.actions;

export default rentalSlice.reducer;
