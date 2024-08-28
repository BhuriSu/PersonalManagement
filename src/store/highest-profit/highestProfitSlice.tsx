import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HighestProfitState {
  value: number;
  allProfits: number[];  // Store all profits here
}

const initialState: HighestProfitState = {
  value: 0,
  allProfits: [],
};

const highestProfitSlice = createSlice({
  name: 'highestProfit',
  initialState,
  reducers: {
    setHighestProfit: (state, action: PayloadAction<number>) => {
      state.allProfits.push(action.payload); // Push the profit to the array
      if (action.payload > state.value) {
        state.value = action.payload;
      }
    },
  },
});

export const { setHighestProfit } = highestProfitSlice.actions;
export default highestProfitSlice.reducer;
