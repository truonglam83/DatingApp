import { http } from './../../utils/config';
import { AppDispatch } from '@/redux/configStore';
import {
  IChatList,
  IConversation,
  IMatchedUser,
} from './../../interface/chat-interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IChatState {
  matchedUser: IMatchedUser[];
  listChat: IChatList[];
  conversation: IConversation | null;
  onlineUsers: string[];
}

const initialState: IChatState = {
  matchedUser: [],
  listChat: [],
  conversation: null,
  onlineUsers: [],
};

const chatReducer = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    getMatchedUser: (
      state: IChatState,
      action: PayloadAction<IMatchedUser[]>
    ) => {
      state.matchedUser = action.payload;
    },
    getAllListChat: (state: IChatState, action: PayloadAction<IChatList[]>) => {
      state.listChat = action.payload;
    },
    createConversation: (
      state: IChatState,
      action: PayloadAction<IConversation>
    ) => {
      state.conversation = action.payload;
    },
    setOnlineUsers: (state: IChatState, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { getMatchedUser, getAllListChat, createConversation, setOnlineUsers } =
  chatReducer.actions;

export default chatReducer.reducer;

export const createConversationApi = async (id: string) => {
  try {
    const response = await http.post('/conversation', {
      receiverId: id,
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getAllListChatApi = async () => {
  try {
    const response = await http.get('/conversation');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMatchedUserApi = async () => {
  try {
    const response = await http.get('/match');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLastMessageApi = async (id: string) => {
  try {
    const response = await http.get(`/last-message/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const createNewMessageApi = async (data: any) => {
  try {
    const response = await http.post('/message', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
