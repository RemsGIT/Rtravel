"use client"
import {styled} from "@mui/material/styles";
import Theme from "@/theme/Theme";
import {SettingsConsumer, SettingsProvider} from "@/context/settingsContext";
import App from "@/components/App";
import ReactHotToast from "@/theme/libs/react-hot-toast";
import toast, {Toaster} from "react-hot-toast";
import {ProtectedLayout} from "@/components/layouts/protectedLayouts";

const VerticalLayoutWrapper = styled('div')({
    height: '100%',
    display: 'flex'
})


const AppContainer = (props: any) => {

    return (
        <ProtectedLayout>
            <>
                <VerticalLayoutWrapper>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <App children={props.children} {...props}></App>
                </VerticalLayoutWrapper>
            </>
        </ProtectedLayout>
    )

}


export default AppContainer