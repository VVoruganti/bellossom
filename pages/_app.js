import '../styles/globals.css'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Bollywood Dance Planner</title>
                <meta name="description" content="Bollywood Dance Workshops" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: 'light',
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    )
}

export default MyApp
