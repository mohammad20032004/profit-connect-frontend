import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // يمكنك إضافة المزيد من الـ reducers هنا مستقبلاً
  },
});