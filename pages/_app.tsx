import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { CustomHead } from '../components';
import { darkTheme } from '../theme';
import { NhostNextProvider, NhostClient } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo'
import { Toaster } from 'react-hot-toast';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
});

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <NhostNextProvider nhost={nhost} initial={(pageProps as any).nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <NextUIProvider theme={darkTheme}>
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
        </NextUIProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  </>
}

export default MyApp
