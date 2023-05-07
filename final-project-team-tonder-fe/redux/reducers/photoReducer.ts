import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPhoto } from '../../interface/photo-interface';
import { AppDispatch } from '../configStore';
import { http } from '../../utils/config';

export interface IPhotoState {
  photos: IPhoto[] | null;
}

const initialState: IPhotoState = {
  photos: [],
};

const photoReducer = createSlice({
  name: 'imageReducer',
  initialState,
  reducers: {
    getAllPhotosAction: (
      state: IPhotoState,
      action: PayloadAction<IPhoto[]>
    ) => {
      state.photos = action.payload;
    },
  },
});
export const { getAllPhotosAction } = photoReducer.actions;
export default photoReducer.reducer;

export const getAllPhotos = () => {
  return async (dispatch: AppDispatch) => {
    const res = await http.get(`/photo/all-photos`);
    try {
      if (res) {
        const data: IPhoto[] = res.data;
        dispatch(getAllPhotosAction(data));
        return data;
      }
    } catch (error) {
      return error;
    }
  };
};
