import { configureStore, createAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatReducer, { IChatState } from './reducers/chatReducer';
import loginReducer, { ILoginState } from './reducers/loginReducer';
import photoReducer, { IPhotoState } from './reducers/photoReducer';
import userReducer, { IUserState } from './reducers/userReducer';
import socketReducer, { ISocketState } from './reducers/socketReducer';

export const register = createAction<string>('register');

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['socketReducer'], // Exclude socketReducer from being persisted globally
  // debug: true, // Enable debugging logs
};

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  userReducer: userReducer,
  chatReducer: chatReducer,
  photoReducer: photoReducer,
  socketReducer: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);

export type RootState = {
  loginReducer: ILoginState;
  chatReducer: IChatState;
  userReducer: IUserState;
  photoReducer: IPhotoState;
  socketReducer: ISocketState;
};

export type AppDispatch = typeof store.dispatch;
