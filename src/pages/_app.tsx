import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'; // 1. Import Provider
import { store } from '@/store/store';   // 2. Import store của bạn
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';


const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // 3. Bọc Provider ở lớp ngoài cùng nhất
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;