"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserProfile, setAuthChecked, setAuthData } from '@/lib/features/userSlice';
import { getCurrentUser } from '@/services/authService';

export default function AuthBootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      const token = window.localStorage.getItem('profit_connect_token');

      if (!token) {
        dispatch(setAuthChecked(true));
        return;
      }

      try {
        const data = await getCurrentUser(token);

        if (!isMounted) {
          return;
        }

        dispatch(setAuthData({
          token,
          user: data?.user,
        }));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        window.localStorage.removeItem('profit_connect_token');
        dispatch(clearUserProfile());
      }
    };

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return null;
}
