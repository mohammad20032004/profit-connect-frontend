"use client";
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const theme = createTheme({
  palette: {
    primary: { main: '#7B2CBF' },
    background: { default: '#ffffff' },
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
