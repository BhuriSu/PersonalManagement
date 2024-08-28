import { configureStore } from '@reduxjs/toolkit';
import { navigationReducer } from './sidebar/navigationSlice';
import { calendarReducer } from './calendar/calendarSlice';
import transactionReducer from './transaction/transactionSlice';
import profitReducer from './profit/profitSlice';
import connectionsReducer from './profile/profileSlice';
import highestProfitReducer from './highest-profit/highestProfitSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    profits: profitReducer,
    highestProfit: highestProfitReducer,
    connections: connectionsReducer,
    navigation: navigationReducer,
    calendar: calendarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
