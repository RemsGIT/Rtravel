
import './globals.scss'
import {Inter} from 'next/font/google'
import Head from "next/head";
import {Metadata} from "next";

const inter = Inter({subsets: ['latin']})

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    themeColor: "#FFFFFF",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export default function RootLayout(props: any) {
    return (
            <html lang="en">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/icon.png"></link>
                    <meta name="theme-color" content="#fff" />
                </Head>
                <body className={inter.className}>
                    <script async
                            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDc14yoTa1jbLUY7PefSHQemTD3JcDgYrI&libraries=places&amp;language=fr">
                    </script>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    {props.children}
                </body>
            </html>
    )
}
