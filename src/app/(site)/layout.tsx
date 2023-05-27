"use client"

import '../globals.scss'

import AppContainer from "@/components/AppContainer";
import {SessionProvider} from "next-auth/react";
export default function AppLayout(props: any) { 
    // ** Hooks
    return (
        <>
            <SessionProvider session={props.session} refetchInterval={1200}>
                {/* eslint-disable-next-line react/no-children-prop */}
                <AppContainer children={props.children}/>
            </SessionProvider>

        </>
    )
}