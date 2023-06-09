
import './globals.scss'
import {Inter} from 'next/font/google'
import Head from "next/head";
import {Metadata} from "next";
import {SettingsConsumer, SettingsProvider} from "@/context/settingsContext";
import Theme from "@/theme/Theme";
import AuthDetectorMode from "@/app/(auth)/AuthDetectorMode";
import Box from "@mui/material/Box";
import ReactHotToast from "@/theme/libs/react-hot-toast";
import {Toaster} from "react-hot-toast";
import LoadingPageSpinner from "@/components/LoadingPageSpinner";
import ThemeContainer from "@/ThemeContainer";

const inter = Inter({subsets: ['latin']})

const APP_NAME = "Rtravel";
const APP_DEFAULT_TITLE = "Rtravel - Votre planificateur de voyage";
const APP_TITLE_TEMPLATE = "%s - Rtravel";
const APP_DESCRIPTION = "Application de planification de voyage!";

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
                    <ThemeContainer children={props.children} />
                </body>
            </html>
    )
}
