import {
  IMatchUser,
  IUserMatch,
  IUserNoti,
} from './../../interface/user-interface';
import { IUser } from '@/interface/user-interface';
import { http } from '@/utils/config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../configStore';
import { IFormUpdateDetail } from '../../types/profileType/index';
import { ILocation } from '@/interface/location-interface';

export interface IUserState {
  user: IUser[] | null;
  userProfile: IUser | null;
  matchUser: IMatchUser | null;
  userNoti: IUserNoti[] | null;
  userLocation: ILocation;
  selectUser: IUser | null;
  userInfo: IUserMatch[] | null;
}

const initialState: IUserState = {
  user: [],
  userProfile: null,
  matchUser: null,
  userNoti: null,
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
  selectUser: null,
  userInfo: [],
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    getUserByRadiusAction: (
      state: IUserState,
      action: PayloadAction<IUser[]>
    ) => {
      state.user = action.payload;
    },
    userProfileAction: (state: IUserState, action: PayloadAction<IUser>) => {
      state.userProfile = action.payload;
    },
    getNotificationAction: (
      state: IUserState,
      action: PayloadAction<IUserNoti[]>
    ) => {
      state.userNoti = action.payload;
    },
    userLocationAction: (
      state: IUserState,
      action: PayloadAction<ILocation>
    ) => {
      state.userLocation = action.payload;
    },
    userSelectedAction: (
      state: IUserState,
      action: PayloadAction<IUser | null>
    ) => {
      state.selectUser = action.payload;
    },
    userMatchedInfoAction: (
      state: IUserState,
      action: PayloadAction<IUserMatch[] | null>
    ) => {
      state.userInfo = action.payload;
    },
  },
});
export const {
  getUserByRadiusAction,
  userProfileAction,
  getNotificationAction,
  userLocationAction,
  userSelectedAction,
  userMatchedInfoAction,
} = userReducer.actions;
export default userReducer.reducer;

export const setLocationUser = (payload: ILocation) => {
  return async (dispatch: AppDispatch) => {
    try {
      await http.post('location/create-location', payload);
      dispatch(
        userLocationAction({
          latitude: payload.latitude,
          longitude: payload.longitude,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserByRadius = (
  latitude: number,
  longitude: number,
  radius: number
) => {
  return async (dispatch: AppDispatch) => {
    const res = await http.post('/location/user-within-radius', {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
    });
    try {
      if (res) {
        const user: IUser[] = res.data;
        dispatch(getUserByRadiusAction(res.data));
        return user;
      }
      dispatch(
        setLocationUser({
          latitude: latitude,
          longitude: longitude,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const uploadImageApi = (formData: FormData) => {
  return async () => {
    try {
      const response = await http.post('/photo/upload', formData);
      return response;
    } catch (error) {
      return error;
    }
  };
};

export const updateInfoUser = (payload: any) => {
  return async () => {
    try {
      const { data } = await http.put('/user/summary', payload);
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const updateDetailUser = (user: IFormUpdateDetail) => {
  return async () => {
    try {
      const { data } = await http.put('/user', user);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const getProfileUser = () => {
  return async (dispatch: AppDispatch) => {
    const res = await http.get(`/user/profile`);
    try {
      if (res) {
        const data: IUser = res.data;
        dispatch(userProfileAction(data));
      }
    } catch (error) {
      return error;
    }
  };
};

export const createMatchedUser = (matchedUserId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await http.post('match', { id: matchedUserId });
      return res.data;
    } catch (error) {
      return error;
    }
  };
};

export const getNotification = async () => {
  try {
    const res = await http.get('notification');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateNotification = async (notiId: string) => {
  try {
    const res = await http.put('notification', { id: notiId });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const dislikeUserApi = async (userId: string) => {
  try {
    const res = await http.patch(`/user/blacklist`, {
      id: userId,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getUserBlackList = async () => {
  try {
    const res = await http.get('/user/blacklist');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await http.post(`/user/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
