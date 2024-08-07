
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profit {
  id: string;
  profit: number;
}

interface ProfitState {
  profits: Profit[];
}

const initialState: ProfitState = {
  profits: [],
};

const profitSlice = createSlice({
  name: 'profits',
  initialState,
  reducers: {
    addProfit(state, action: PayloadAction<number>) {
      state.profits.push({
        id: Date.now().toString(), // Use a unique ID generator in production
        profit: action.payload,
      });
    },
    // Other reducers if needed
  },
});

export const { addProfit } = profitSlice.actions;
export default profitSlice.reducer;
