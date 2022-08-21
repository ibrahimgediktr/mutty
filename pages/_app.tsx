import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';

import * as ga from '../utils/ga';
import { useRouter } from 'next/router';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            ga.pageview(url)
        }
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <>
            <Head>
                <title>Mutty - Twitter Muted Words Manager</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'light',
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
}