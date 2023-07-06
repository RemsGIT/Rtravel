import Menu from "@/components/Menu/Menu";
import AppBar from "@/components/Menu/AppBar/AppBar";
import AppBarContent from "@/components/Menu/AppBar/AppBarContent";
import {styled, Theme, useTheme} from "@mui/material/styles";
import {Box, BoxProps, useMediaQuery} from "@mui/material";
import themeConfig from "@/theme/ThemeConfig";
import {useEffect, useState} from "react";
import routes from "@/configs/routes";
import LoadingPageSpinner from "@/components/LoadingPageSpinner";
import {Mode} from "@/types/LayoutTypes";

const MainContentWrapper = styled(Box)<BoxProps>({
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
})

const ContentWrapper = styled('main')(({theme}) => ({
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(6),
    transition: 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

const App = (props: any) => {
    const theme = useTheme()

    const [isLoading, setisLoading] = useState<Boolean>(true)

    const {children, scrollToTop, footerProps, contentHeightFixed, verticalLayoutProps} = props
    const {navigationSize, disableCustomizer, collapsedNavigationSize} = themeConfig

    const [navVisible, setNavVisible] = useState<boolean>(false)
    const contentWidth = 'boxed'

    const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
    
    
    const toggleNavVisibility = () => {
        setNavVisible(!navVisible)
    }

    useEffect(() => {
        setisLoading(false)
    }, [theme.palette.mode])
    
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
    
    return (
        <>
            {!isLoading ? (
                <>
                    <Menu
                        settings={props.settings}
                        navWidth={navigationSize}
                        collapsedNavWidth={collapsedNavigationSize}
                        navVisible={navVisible}
                        setNavVisible={setNavVisible}
                        toggleNavVisibility={toggleNavVisibility}
                        hidden={hidden}
                        {...props}
                    />
                    <MainContentWrapper
                        className="layout-content-wrapper"
                        sx={{...(contentHeightFixed && {maxHeight: '100vh'})}}
                    >
                        <AppBar
                            toggleNavVisibility={toggleNavVisibility}
                            appBarContent={{
                                //@ts-ignore
                                content: props => (
                                    //@ts-ignore
                                    <AppBarContent
                                        {...props}
                                        settings={props.settings}
                                        hidden={hidden}
                                        setNavVisible={setNavVisible}

                                    />
                                )
                            }}
                            appBarProps={{
                                // @ts-ignore
                                navMenu: routes
                            }}
                        >
                        </AppBar>

                        {/* Content of page */}
                        <ContentWrapper
                            className='layout-page-content'
                            sx={{
                                ...(contentHeightFixed && {
                                    overflow: 'hidden',
                                    '& > :first-of-type': {height: '100%'}
                                }),
                                ...(contentWidth === 'boxed' && {
                                    mx: 'auto',
                                    '@media (min-width:1440px)': {maxWidth: 1440},
                                    '@media (min-width:1200px)': {maxWidth: '100%'}
                                })
                            }}
                        >
                            {children}
                        </ContentWrapper>
                    </MainContentWrapper>
                </>
            ) : (
                <LoadingPageSpinner />
            )
            }

        </>
    )

}

export default App