import {useEffect} from "react";
import {useTheme} from "@mui/material/styles";

const AuthDetectorMode = () => {
    const theme = useTheme();
    
    useEffect(() => {
        const metaElement = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
        // Update background color for PWA
        if (theme.palette.mode === 'light') {
            // PWA background color
            metaElement.content = theme.palette.customColors.lightBg;
        } else {
            metaElement.content = theme.palette.customColors.darkBg
        }
    }, [theme])

    return (<></>)
}

export default AuthDetectorMode