// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { Theme } from '@mui/material/styles'

// ** Type Imports
import { Settings} from "@/context/settingsContext";

// ** Theme Config
import themeConfig from "@/theme/ThemeConfig";

// ** Theme
import themeOptions from './ThemeOptions'

// ** Global Styles
import GlobalStyling from './globalStyles'

// ** Theme Override Imports
import {deepmerge} from "@mui/utils";
import overrides from './overrides'
import typography from './typography'

interface Props {
    settings: Settings
    children: ReactNode
}

const Theme = (props: Props) => {
    // ** Props
    const { settings, children } = props

    // ** Pass merged ThemeOptions (of core and user) to createTheme function
    let theme = createTheme(themeOptions(settings))

    // ** Deep Merge Component overrides of core and user
    const mergeComponentOverrides = (theme: Theme, settings: Settings) =>
        deepmerge({ ...overrides(theme, settings) },{})

    // ** Deep Merge Typography of core and user
    const mergeTypography = (theme: Theme) => deepmerge(typography(theme),{})

    // ** Continue theme creation and pass merged component overrides to CreateTheme function
    theme = createTheme(theme, {
        components: { ...mergeComponentOverrides(theme, settings) },
        typography: { ...mergeTypography(theme) }
    })


    // ** Set responsive font sizes to true
    if (themeConfig.responsiveFontSizes) {
        theme = responsiveFontSizes(theme)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={() => GlobalStyling(theme) as any} />
            {children}
        </ThemeProvider>
    )
}

export default Theme
