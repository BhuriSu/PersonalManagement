import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HighestProfitState {
  value: number;
}

const initialState: HighestProfitState = {
  value: 0,
};

const highestProfitSlice = createSlice({
  name: 'highestProfit',
  initialState,
  reducers: {
    setHighestProfit: (state, action: PayloadAction<number>) => {
      if (action.payload > state.value) {
        state.value = action.payload;
      }
    },
  },
});

export const { setHighestProfit } = highestProfitSlice.actions;
export default highestProfitSlice.reducer;
