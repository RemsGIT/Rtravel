"use client"
import {LayoutProps, NavGroup, NavLink, NavSectionTitle} from "@/types/LayoutTypes";
import MenuHeader from "@/components/Menu/MenuHeader";
import {Box, BoxProps, List} from "@mui/material";

// CUSTOM MENU COMPONENTS
import MenuSectionTitle from "@/components/Menu/utils/MenuSectionTitle";
import Drawer from "@/components/Menu/utils/Drawer";
import {useEffect, useRef, useState} from "react";
import {useSettings} from "@/hooks/useSettings";
import MenuNavLink from "@/components/Menu/utils/MenuNavLink";
import routes from "@/configs/routes";
import {styled, useTheme} from "@mui/material/styles";
import {hexToRGBA} from "@/app/utils";

interface Props {
    navWidth: number
    navVisible: boolean
    collapsedNavWidth: number
    hidden: LayoutProps['hidden']
    navigationBorderWidth: number
    toggleNavVisibility: () => void
    settings: LayoutProps['settings']
    children: LayoutProps['children']
    setNavVisible: (value: boolean) => void
    saveSettings: LayoutProps['saveSettings']
    navMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['content']
    navMenuBranding: LayoutProps['verticalLayoutProps']['navMenu']['branding']
    menuLockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
    verticalNavItems: LayoutProps['verticalLayoutProps']['navMenu']['navItems']
    navMenuProps: LayoutProps['verticalLayoutProps']['navMenu']['componentProps']
    menuUnlockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
    afterNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['afterContent']
    beforeNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['beforeContent']
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
    top: 60,
    left: -8,
    zIndex: 2,
    opacity: 0,
    position: 'absolute',
    pointerEvents: 'none',
    width: 'calc(100% + 15px)',
    height: theme.mixins.toolbar.minHeight,
    transition: 'opacity .15s ease-in-out',
    '&.scrolled': {
        opacity: 1
    }
}))

const resolveNavItemComponent = (item: NavGroup | NavLink | NavSectionTitle) => {
    if ((item as NavSectionTitle).sectionTitle) return MenuSectionTitle
    if ((item as NavGroup).children) return MenuSectionTitle

    return MenuNavLink
}

const Menu = (props: Props) => {
    // ** States
    const [navHover, setNavHover] = useState<boolean>(false)
    const [groupActive, setGroupActive] = useState<string[]>([])
    const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([])
    const {settings, saveSettings} = useSettings();
    
    const RenderMenuItems = routes?.map((item: NavGroup | NavLink | NavSectionTitle, index: number) => {
        const TagName: any = resolveNavItemComponent(item)

        return <TagName {...props} key={index} item={item} navHover={navHover} navigationBorderWidth={settings.skin === 'bordered' ? 1 : 0 } />
    })

    const shadowRef = useRef(null)
    
    // ** hooks
    const theme = useTheme()
    
    const shadowBgColor = () => {
        if (settings.mode === 'light') {
            return `linear-gradient(${theme.palette.customColors.lightBg} 5%,${hexToRGBA(
                theme.palette.customColors.lightBg,
                0.85
            )} 30%,${hexToRGBA(theme.palette.customColors.lightBg, 0.5)} 65%,${hexToRGBA(
                theme.palette.customColors.lightBg,
                0.3
            )} 75%,transparent)`
        } else {
            return `linear-gradient(${theme.palette.customColors.darkBg} 5%,${hexToRGBA(
                theme.palette.customColors.darkBg,
                0.85
            )} 30%,${hexToRGBA(theme.palette.customColors.darkBg, 0.5)} 65%,${hexToRGBA(
                theme.palette.customColors.darkBg,
                0.3
            )} 75%,transparent)`
        }
    }
    return (
    <>
        <Drawer {...props} navHover={navHover} setNavHover={setNavHover} navigationBorderWidth={props.navigationBorderWidth ?? 0}>
            <MenuHeader settings={settings} navHover={navHover} saveSettings={saveSettings} hidden={props.hidden} toggleNavVisibility={props.toggleNavVisibility}/>
            <StyledBoxForShadow ref={shadowRef} sx={{ background: shadowBgColor()}}></StyledBoxForShadow>
            <Box sx={{position: 'relative', overflow: 'hidden'}}>
                <List className='nav-items' sx={{
                    pt: 0,
                    transition: 'padding .25s ease',
                    '& > :first-child': { mt: '0' },
                    pr: !settings.navCollapsed || (settings.navCollapsed && navHover) ? 4.5 : 1.25
                }}>
                    {RenderMenuItems}
                </List>
            </Box>
        </Drawer>
    </>
    )
}

export default Menu;