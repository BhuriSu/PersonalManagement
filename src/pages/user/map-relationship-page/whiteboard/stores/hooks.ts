import { createSelector } from 'reselect';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { type Store } from '@reduxjs/toolkit';

export const useAppStore: () => Store<RootState> = useStore;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
;

export const createAppSelector = <TState = RootState, TResult = unknown>(
  inputSelectors: ((state: TState, ...args: any[]) => unknown)[],
  resultFunc: (...args: any[]) => TResult
) => createSelector(inputSelectors, resultFunc);

export const createParametricSelectorHook = <
  Result,
  Params extends readonly unknown[],
>(
  selector: (state: RootState, ...params: Params) => Result,
) => {
  return (...args: Params) => {
    return useSelector((state: RootState) => selector(state, ...args));
  };
};
