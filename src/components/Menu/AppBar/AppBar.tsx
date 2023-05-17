"use client"

import {LayoutProps} from "@/types/LayoutTypes";
import {styled, useTheme} from "@mui/material/styles";
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar'
import {hexToRGBA} from "@/app/utils";
import {useMediaQuery} from "@mui/material";
import {useSettings} from "@/hooks/useSettings";


interface Props {
    hidden: LayoutProps['hidden']
    toggleNavVisibility: () => void
    settings: LayoutProps['settings']
    saveSettings: LayoutProps['saveSettings']
    appBarContent: any
    appBarProps: NonNullable<LayoutProps['verticalLayoutProps']['appBar']>['componentProps']
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
    transition: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 6),
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    minHeight: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: `${theme.spacing(0)} !important`,
    minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
    transition: 'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out'
}))

const LayoutAppBar = (props: Props) => {
    // ** Props
    const { appBarProps, appBarContent: userAppBarContent } = props
    
    // HOOKS
    const theme = useTheme()
    const { settings, saveSettings } = useSettings()
    
    // ** Vars
    const { skin, appBar, appBarBlur, contentWidth } = settings
    
    if (appBar === 'hidden') {
        return null
    }

    let userAppBarStyle = {}
    if (appBarProps && appBarProps.sx) {
        userAppBarStyle = appBarProps.sx
    }
    const userAppBarProps = Object.assign({}, appBarProps)
    delete userAppBarProps.sx
    
    return (
        <AppBar
            elevation={0}
            color='default'
            className='layout-navbar'
            sx={{ ...userAppBarStyle }}
            position={appBar === 'fixed' ? 'sticky' : 'static'}
            {...userAppBarProps}
        >
            <Toolbar
                className='navbar-content-container'
                sx={{
                    ...(contentWidth === 'boxed' && {
                        '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
                    })
                }}
            >
                {(userAppBarContent.content && userAppBarContent.content(props)) || null}
            </Toolbar>
        </AppBar>
    )
}

export default LayoutAppBar
