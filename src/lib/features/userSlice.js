import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: "Amen",
    email: "amen@example.com",
    preferredLanguage: "en", // هذه القيمة ستحدد اللغة لاحقاً
  },
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateLanguage: (state, action) => {
      state.profile.preferredLanguage = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { updateLanguage, setUserProfile } = userSlice.actions;
export default userSlice.reducer;