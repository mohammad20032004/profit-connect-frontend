'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#240046', // لون مشروعك الأساسي
      light: '#52297c',
      dark: '#1a0031',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0a66c2', // لون الروابط أو الأزرار الثانوية
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f5f7', // خلفية رمادية فاتحة
      paper: '#ffffff',   // خلفية البطاقات
    },
    text: {
      primary: '#111827', // لون النص الأساسي
      secondary: '#6b7280', // لون النص الباهت
    },
    divider: '#e5e7eb', // لون الفواصل والحدود
    custom: {
      shadowLight: '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)',
      cardBorder: '#e5e7eb',
      hover: '#f9fafb'
    }
  },
  typography: {
    fontFamily: 'var(--font-dubai), sans-serif',
    h6: {
        fontWeight: 800,
    },
    subtitle1:{
      fontWeight:800,
    },
    button:{
      fontWeight: 700,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // لا تجعل الحروف كبيرة
          borderRadius: 8, // مثال على زوايا دائرية
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 12,
            }
        }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides:{
        root:{
          fontFamily: 'var(--font-dubai), sans-serif',
        }
      }
    },
     MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none', // إزالة الظل الافتراضي
          border: '1px solid #e5e7eb', // إضافة حد للبطاقة
        }
      }
    }
  },
});

export default theme;
