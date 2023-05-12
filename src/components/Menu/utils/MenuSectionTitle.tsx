import {Settings} from "@/context/settingsContext";
import {NavSectionTitle} from "@/types/LayoutTypes";
import {Icon, ListSubheaderProps, styled, Typography} from "@mui/material";
import MuiListSubheader from "@mui/material/ListSubheader"

interface Props {
    navHover: boolean
    settings: Settings
    item: NavSectionTitle
    collapsedNavWidth: number
    navigationBorderWidth: number
}

const ListSubheader = styled((props: ListSubheaderProps) => <MuiListSubheader component='li' {...props} />)(
    ({ theme }) => ({
        lineHeight: 1,
        display: 'flex',
        position: 'static',
        marginTop: theme.spacing(3.5),
        paddingTop: theme.spacing(1.5),
        backgroundColor: 'transparent',
        paddingBottom: theme.spacing(1.5),
        transition: 'padding-left .25s ease-in-out'
    })
)

const MenuSectionTitle = (props: Props) => {
    // ** Props
    const { item, navHover, settings, collapsedNavWidth, navigationBorderWidth } = props

    // ** Vars
    const { navCollapsed } = settings

    console.log(settings)

    return (
            <ListSubheader
                className='nav-section-title'
                sx={{
                    ...(navCollapsed && !navHover
                        ? { py: 0.5, px: (collapsedNavWidth - navigationBorderWidth - 22) / 8 }
                        : { px: 7.5 }),
                    '& .MuiTypography-root, & svg': {
                        color: 'text.disabled'
                    }
                }}
            >
                {navCollapsed && !navHover ? (
                    <span>icon</span>
                ) : (
                    <Typography noWrap variant='caption' sx={{ textTransform: 'uppercase' }}>
                        {item.sectionTitle}
                    </Typography>
                )}
            </ListSubheader>
    )
}
export default MenuSectionTitle