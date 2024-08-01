import { createListenerMiddleware, addListener } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import type {
  TypedAddListener,
  TypedStartListening,
  TypedStopListening,
} from '@reduxjs/toolkit';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppStopListening = TypedStopListening<RootState, AppDispatch>;

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const stopAppListening =
  listenerMiddleware.stopListening as AppStopListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;
