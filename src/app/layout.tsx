"use client" 

import './globals.scss'
import {Inter} from 'next/font/google'
import Head from "next/head";
import Pwa from "@/app/Pwa";

const inter = Inter({subsets: ['latin']})

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
                    <Pwa/>
                </body>
            </html>
    )
}
