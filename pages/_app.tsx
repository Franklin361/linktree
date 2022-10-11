import { NextUIProvider } from '@nextui-org/react';
import { NhostClient, NhostNextProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { CustomHead } from '../components';
import { NotificationProvider } from '../context';
import { store } from '../redux';
import '../styles/globals.css';
import { darkTheme } from '../theme';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
});

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <NhostNextProvider nhost={nhost} initial={(pageProps as any).nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <NextUIProvider theme={darkTheme}>
          <Provider store={store}>
            <NotificationProvider>
              <CustomHead />
              <Component {...pageProps} />
              <Toaster
                position='bottom-right'
                toastOptions={{
                  style: {
                    borderRadius: '70px',
                    background: '#000',
                    color: '#fff',
                    padding: '10px'
                  },
                  duration: 4000
                }} />
            </NotificationProvider>
          </Provider>
        </NextUIProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  </>
}

export default MyApp
