"use client"
import {SettingsConsumer, SettingsProvider} from "@/context/settingsContext";
import Theme from "@/theme/Theme";
import ReactHotToast from "@/theme/libs/react-hot-toast";
import {Toaster} from "react-hot-toast";

const ThemeContainer = ({children}: {children: React.ReactElement}) => {
    return (
        <SettingsProvider>
            <SettingsConsumer>
                {({ settings }) => {
                    return (
                        <Theme settings={settings}>
                            {children}
                            <ReactHotToast>
                                <Toaster position={settings.toastPosition} toastOptions={{className: 'react-hot-toast'}}/>
                            </ReactHotToast>
                        </Theme>
                    )
                }}
            </SettingsConsumer>
        </SettingsProvider>
    )
}

export default ThemeContainer