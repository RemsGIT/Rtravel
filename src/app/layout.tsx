import './globals.scss'
import {Inter} from 'next/font/google'
import Head from "next/head";

const inter = Inter({subsets: ['latin']})
export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout(props: any) {
    return (
            <html lang="en">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
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
