import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
    updateUserProfile: (state, action) => {
      if (!state.profile) {
        state.profile = action.payload;
        return;
      }
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
  },
});

export const { setUserProfile, clearUserProfile, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
