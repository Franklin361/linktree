import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { CustomHead } from './components/ui/CustomHead';
import { darkTheme } from './theme';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <NextUIProvider theme={darkTheme}>
      <CustomHead />
      <Component {...pageProps} />
    </NextUIProvider>
  </>
}

export default MyApp
