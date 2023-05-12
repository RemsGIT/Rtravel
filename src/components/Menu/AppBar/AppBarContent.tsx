import {Settings} from "@/context/settingsContext";
import {Box, IconButton, useMediaQuery} from "@mui/material";
import UserDropdown from "@/components/Menu/AppBar/UserDropdown";
import Icon from "@/components/Icon";
import ModeToggler from "@/components/ModeToggler";
import {Theme} from "@mui/material/styles";
import {useSettings} from "@/hooks/useSettings";

interface Props {
    hidden: Boolean,
    settings: Settings
    saveSettings: (values: Settings) => void,
    toggleNavVisibility: () => void,
    setNavVisible: (value: Boolean) => void

}

const AppBarContent = (props: Props) => {
    // ** Props
    const { toggleNavVisibility } = props
    const {settings, saveSettings} = useSettings();
    
    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {props.hidden ? (
                    <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
                        <Icon icon='mdi:menu' />
                    </IconButton>
                ) : null}

                <ModeToggler settings={settings} saveSettings={saveSettings} />
            </Box>
            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
                <UserDropdown settings={settings}/>
            </Box>
        </Box>
    )
}

export default AppBarContent