"use client"
import {
    Box,
    BoxProps,
    Chip,
    ListItem,
    ListItemButton,
    ListItemButtonProps,
    ListItemIcon,
    styled,
    Typography
} from "@mui/material";
import Link from "next/link";
import {handleURLQueries, hexToRGBA} from "@/app/utils";
import {usePathname, useRouter} from "next/navigation";
import {NavGroup, NavLink} from "@/types/LayoutTypes";
import {Settings} from "@/context/settingsContext";
import {ElementType} from "react";
import themeConfig from "@/theme/ThemeConfig";
import Icon from "@/components/Icon";
import {useTheme} from "@mui/material/styles";

interface Props {
    parent?: boolean
    item: NavLink
    navHover?: boolean
    settings: Settings
    navVisible?: boolean
    collapsedNavWidth: number
    navigationBorderWidth: number
    toggleNavVisibility: () => void
    isSubToSub?: NavGroup | undefined
}

// ** Styled Components
const MenuNavLinkStyled = styled(ListItemButton)<
    ListItemButtonProps & { component?: ElementType; href: string; target?: '_blank' | undefined }
>(({ theme }) => ({
    width: '100%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    color: theme.palette.text.primary,
    transition: 'padding-left .25s ease-in-out',
    '&.active': {
        '&, &:hover': {
            boxShadow: theme.shadows[3],
            backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
        },
        '& .MuiTypography-root, & .MuiListItemIcon-root': {
            color: `${theme.palette.common.white} !important`
        }
    }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const MenuNavLink = ({
     item,
     parent,
     navHover,
     settings,
     navVisible,
     isSubToSub,
     collapsedNavWidth,
     toggleNavVisibility,
     navigationBorderWidth
 }: Props) => {
    // ** Hooks
    const router = useRouter()
    const theme = useTheme()
    const pathname = usePathname()
    
    // ** Vars
    const { navCollapsed, mode } = settings
    
    const icon = parent && !item.icon ? item.icon : item.icon

    const conditionalColors = () => {
        if (mode === 'semi-dark') {
            return {
                color: `rgba(${theme.palette.customColors.dark}, 0.87)`,
                '&:hover': {
                    backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.04)`
                }
            }
        } else return {}
    }
    
    return (
            <ListItem
                disablePadding
                className='nav-link'
                disabled={item.disabled || false}
                sx={{ mt: 1.5, px: '0 !important' }}
            >
                <MenuNavLinkStyled
                    component={Link}
                    {...(item.disabled && { tabIndex: -1 })}
                    className={pathname === item.path ? 'active' : ''}
                    href={item.path === undefined ? '/' : `${item.path}`}
                    {...(item.openInNewTab ? { target: '_blank' } : null)}
                    onClick={(e: any) => {
                        if (item.path === undefined) {
                            e.preventDefault()
                            e.stopPropagation()
                        }
                        if (navVisible) {
                            toggleNavVisibility()
                        }
                    }}
                    sx={{
                        py: 2.25,
                        ...conditionalColors(),
                        ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
                        pl: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24) / 8 : 5.5,
                        pr: navCollapsed && !navHover ? ((collapsedNavWidth - navigationBorderWidth - 24) / 2 - 5) / 4 : 3.5
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: 'text.primary',
                            transition: 'margin .25s ease-in-out',
                            ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2.5 }),
                            ...(parent ? { ml: 1.25, mr: 3.75 } : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
                            '& svg': {
                                fontSize: '0.875rem',
                                ...(!parent ? { fontSize: '1.5rem' } : {}),
                                ...(parent && item.icon ? { fontSize: '0.875rem' } : {})
                            }
                        }}
                    >
                        <Icon icon={icon ?? ''} />
                    </ListItemIcon>

                    <MenuItemTextMetaWrapper
                        sx={{
                            ...(isSubToSub ? { ml: 9 } : {}),
                            ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
                        }}
                    >
                        <Typography
                            {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                                noWrap: true
                            })}
                        >
                            {item.title}
                        </Typography>
                        {item.badgeContent ? (
                            <Chip
                                size='small'
                                label={item.badgeContent}
                                color={item.badgeColor || 'primary'}
                                sx={{
                                    ml: 1.25,
                                    height: 20,
                                    fontWeight: 500,
                                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                                }}
                            />
                        ) : null}
                    </MenuItemTextMetaWrapper>
                </MenuNavLinkStyled>
            </ListItem>
    )
}

export default MenuNavLink
