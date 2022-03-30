import Head from 'next/head';

import { ToastContainer, Bounce } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppThemeProvider } from '../src/theme';
import { AuthProvider } from '../src/libs/auth/react';

import { AuthAppProps } from '../src/libs/auth/next/types';

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = (props: AuthAppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Next.js</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider auth={Component.auth}>
          <AppThemeProvider>
            <ToastContainer
              limit={3}
              autoClose={5000}
              transition={Bounce}
              icon
            />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </AppThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
