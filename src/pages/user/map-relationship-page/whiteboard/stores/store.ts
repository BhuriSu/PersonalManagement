import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './middlewares/listenerMiddleware';
import historyReducer from './reducers/history';
import canvasReducer, {
  ignoredActionsInHistory,
  initialState,
} from '../services/canvas/slice';

const canvas = historyReducer(
  canvasReducer,
  initialState,
  ignoredActionsInHistory,
);

export const store = configureStore({
  reducer: {
    canvas,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
