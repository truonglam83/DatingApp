import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface ISocketState {
  socketChat: Socket | null;
  socketNotify: Socket | null;
}

const initialState: ISocketState = {
  socketChat: null,
  socketNotify: null,
};

const socketReducer = createSlice({
  name: 'socketReducer',
  initialState: initialState,
  reducers: {
    setSocketChat: (state, action) => {
      state.socketChat = action.payload;
    },
  },
});

export const { setSocketChat } = socketReducer.actions;
export default socketReducer.reducer;
