import axios from 'axios';
import { ICreateUser } from './../../interface/login-interface';
import { AppDispatch } from '@/redux/configStore';
import { ILoginPhone } from '@/interface/login-interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, http, USER } from '../../utils/config';

export interface ILoginState {
  loginPhone: ILoginPhone;
}

const initialState: ILoginState = {
  loginPhone: {
    id: '',
    phone: '',
    email: '',
    name: '',
    isPhoneConfirmed: false,
  },
};

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState,
  reducers: {
    userLoginPhoneAction: (
      state: ILoginState,
      action: PayloadAction<ILoginPhone>
    ) => {
      state.loginPhone = action.payload;
    },
  },
});

export const { userLoginPhoneAction } = loginReducer.actions;

export default loginReducer.reducer;

export const userLoginPhoneApi = (
  user: ILoginPhone | null,
  accessToken: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/user/login`,
        user,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response) {
        dispatch(userLoginPhoneAction(response.data.user));
        localStorage.setItem(USER, JSON.stringify(response.data.user));
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      }
    } catch (error) {
      return error;
    }
  };
};

export const createNewUserApi = (user: ICreateUser) => {
  return async () => {
    try {
      const response = await http.post('user', user);
      if (response)
        localStorage.setItem(USER, JSON.stringify(response.data.user));
      return response;
    } catch (error) {
      return error;
    }
  };
};
