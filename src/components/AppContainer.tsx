"use client"
import {styled} from "@mui/material/styles";
import Theme from "@/theme/Theme";
import {SettingsConsumer, SettingsProvider} from "@/context/settingsContext";
import App from "@/components/App";
import ReactHotToast from "@/theme/libs/react-hot-toast";
import toast, {Toaster} from "react-hot-toast";
import {SessionProvider} from "next-auth/react";

const VerticalLayoutWrapper = styled('div')({
    height: '100%',
    display: 'flex'
})


const AppContainer = (props: any) => {
    
    return (
        <SettingsProvider>
            <SettingsConsumer>
                {({ settings }) => {
                    return (
                        <Theme settings={settings}>
                            <VerticalLayoutWrapper>
                                {/* eslint-disable-next-line react/no-children-prop */}
                                <App children={props.children} settings={settings} {...props}></App>
                            </VerticalLayoutWrapper>
                            <ReactHotToast>
                                <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                            </ReactHotToast>
                        </Theme>
                    )
                }}
            </SettingsConsumer>
        </SettingsProvider>

    )

}



export default AppContainer