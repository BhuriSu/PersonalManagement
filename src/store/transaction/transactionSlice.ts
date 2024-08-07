// transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  money: number ;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<number>) {
      state.transactions.push({
        id: Date.now().toString(), // Use a unique ID generator in production
        money: action.payload,
      });
    },
    // Other reducers if needed
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
