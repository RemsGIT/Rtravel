"use client"
import {styled} from "@mui/material/styles";
import Theme from "@/theme/Theme";
import {SettingsConsumer, SettingsProvider} from "@/context/settingsContext";
import App from "@/components/App";
import Icon from "@/components/Icon";
import {Suspense} from "react";
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
                        </Theme>
                    )
                }}
            </SettingsConsumer>
        </SettingsProvider>

    )

}


export default AppContainer