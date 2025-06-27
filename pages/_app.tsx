import type { ReactElement, ReactNode } from 'react';

import { CacheProvider } from '@emotion/react';
import { CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as Sentry from '@sentry/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import type { EmotionCache } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import createEmotionCache from '@/clients/EmotionCache';
import { UserProvider, type User } from "@/hooks/useUser/context";
import theme, { koho, italiana } from "@/theme";
import "@/styles/global.css";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const handleStart = (url: string) => {
      setLoading(true);
    };

    const handleComplete = (url: string) => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <div className={`${koho.variable} ${italiana.variable} font-koho`}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="shortcut icon"
            href="https://www.stey.com/static/img/icon.png"
            type="image/x-icon"
          />
        </Head>
        <Script src="https://static.geetest.com/v4/gt4.js" />
        <ThemeProvider theme={theme}>
          <UserProvider>
            <CssBaseline />
            {loading && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: 9999,
                }}
              >
                <CircularProgress />
              </div>
            )}
            {getLayout(<Component {...pageProps} user={user} />)}
          </UserProvider >
        </ThemeProvider >
      </div >
    </CacheProvider >
  );
}

export default Sentry.withProfiler(MyApp);
