import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    username: "amen_dev",
    email: "amen@example.com",
    profile: {
      fullname: "Amen Dev",
      location: "San Francisco, CA",
      age: 30,
      Rscore: 1500,
      headLine: "Full Stack Developer",
      skills: ["JavaScript", "React", "Node.js"],
      bio: "Passionate developer with 5+ years of experience in web development.",
    },
    socialStats: {
      followersCount: 154,
      followingCount: 150
    },
    avatar: 'https://example.com/avatar.jpg',



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