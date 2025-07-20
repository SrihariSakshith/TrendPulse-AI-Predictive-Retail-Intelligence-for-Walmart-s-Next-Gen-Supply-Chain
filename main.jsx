// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// A professional, award-winning dark theme for an enterprise app
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00AEEF', // A vibrant, techy blue
      contrastText: '#ffffff',
    },
    secondary: {
        main: '#34c38f', // A nice green for success states
    },
    background: {
      default: '#121212', // A deep, dark background
      paper: '#1E1E1E', // A slightly lighter paper color for cards
    },
    error: { main: '#f46a6a' },
    warning: { main: '#f1b44c' },
    success: { main: '#34c38f' },
    info: { main: '#50a5f1' },
    text: {
        primary: '#e0e0e0',
        secondary: '#a6a6a6',
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700 }, h2: { fontWeight: 700 }, h3: { fontWeight: 700 },
    h4: { fontWeight: 600 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 12,
            }
        }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);