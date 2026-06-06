"use client";
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5b21b6',
      main: '#7B2CBF',
      dark: '#240046',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#38bdf8',
      main: '#0ea5e9',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      dark: '#059669',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
      neutral: '#cbd5e1',
    },
    text: {
      primary: '#111827',
      secondary: '#64748b',
    },
    custom: {
      border: 'rgba(0,0,0,0.08)',
      shadowLight: '0 4px 12px rgba(0,0,0,0.05)',
      glass: 'rgba(255,255,255,0.46)',
      glassBorder: 'rgba(255,255,255,0.6)',
    }
  },
  typography: {
    fontFamily: 'var(--font-dubai), sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-dubai), sans-serif',
        },
      },
    },
  },
});

export const AppThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const ThemedButton = (props) => <Button {...props} />;
export const ThemedInput = (props) => <TextField {...props} />;

export default theme;
