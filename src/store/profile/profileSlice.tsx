import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  totalConnections: number;
}

const initialState: ProfileState = {
  totalConnections: 0,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setConnections: (state, action: PayloadAction<number>) => {
      state.totalConnections = action.payload;
    },
    addConnection: (state) => {
      state.totalConnections += 1;
    },
    removeConnection: (state) => {
      state.totalConnections -= 1;
    },
  },
});

export const { setConnections, addConnection, removeConnection } = profileSlice.actions;
export default profileSlice.reducer;
