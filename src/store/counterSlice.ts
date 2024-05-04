import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CounterSlice {
    count: number;
}

const initialState: CounterSlice = {
    count: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setCounter: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        }
    }
});

export const { setCounter } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;