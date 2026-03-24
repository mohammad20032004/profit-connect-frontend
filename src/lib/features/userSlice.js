import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  profile: null,
  isAuthenticated: false,
  authChecked: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { token = null, user = null } = action.payload ?? {};

      state.token = token;
      state.user = user;
      state.profile = user?.profile ?? null;
      state.isAuthenticated = Boolean(token && user);
      state.authChecked = true;
    },
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload ?? true;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;

      if (state.user) {
        state.user.profile = action.payload;
      }
    },
    clearUserProfile: (state) => {
      state.token = null;
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.authChecked = true;
    },
    updateUserProfile: (state, action) => {
      if (!state.profile) {
        state.profile = action.payload;
        if (state.user) {
          state.user.profile = action.payload;
        }
        return;
      }

      state.profile = {
        ...state.profile,
        ...action.payload,
      };

      if (state.user) {
        state.user.profile = state.profile;
      }
    },
  },
});

export const { setAuthData, setAuthChecked, setUserProfile, clearUserProfile, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
