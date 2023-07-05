// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from "@/components/Icon";

// ** Types Import
import { Mode} from "@/types/LayoutTypes";
import { Settings} from "@/context/settingsContext";
import {useTheme} from "@mui/material/styles";

interface Props {
    settings: Settings
    saveSettings: (values: Settings) => void
}

const ModeToggler = (props: Props) => {
    const theme = useTheme()

    // ** Props
    const { settings, saveSettings } = props
    
    const handleModeChange = (mode: Mode) => {
        saveSettings({ ...settings, mode: mode })
    }

    const handleModeToggle = () => {
        const metaElement = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
        
        //TODO changer le background de la pwa en fonction ici
        if (settings.mode === 'light') {
            handleModeChange('dark' as Mode)

            // PWA background color
            metaElement.content = theme.palette.customColors.darkBg;
        } else {
            handleModeChange('light' as Mode)
            
            metaElement.content = theme.palette.customColors.lightBg
        }
    }

    return (
        <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
            <Icon fontSize='1.625rem' icon={settings.mode === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'} />
        </IconButton>
    )
}

export default ModeToggler
