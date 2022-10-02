import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { CustomHead } from '../components';
import { darkTheme } from '../theme';
import { NhostNextProvider, NhostClient } from '@nhost/nextjs';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
});

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <NhostNextProvider nhost={nhost} initial={(pageProps as any).nhostSession}>
      <NextUIProvider theme={darkTheme}>
        <CustomHead />
        <Component {...pageProps} />
      </NextUIProvider>
    </NhostNextProvider>
  </>
}

export default MyApp
