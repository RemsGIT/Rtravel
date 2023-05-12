import {Settings} from "@/context/settingsContext";
import {styled} from "@mui/material/styles";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {Fragment, SyntheticEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {Avatar, Badge, Box, Divider, Menu, Typography} from "@mui/material";

interface Props {
    settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
    // ** Props
    const { settings } = props

    // ** States
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    // ** Hooks
    const router = useRouter()
    //const { logout } = useAuth()
    
    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = (url?: string) => {
        if (url) {
            router.push(url)
        }
        setAnchorEl(null)
    }

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            mr: 2,
            fontSize: '1.375rem',
            color: 'text.primary'
        }
    }

    const handleLogout = () => {
        //logout()
        console.log('logout')
        handleDropdownClose()
    }

    return (
        <Fragment >
            <Badge
                overlap='circular'
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            >
                <Avatar
                    alt='John Doe'
                    src='/images/avatars/1.png'
                    onClick={handleDropdownOpen}
                    sx={{ width: 40, height: 40 }}
                />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge
                            overlap='circular'
                            badgeContent={<BadgeContentSpan />}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                        >
                            <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
                        </Badge>
                        <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 600 }}>John Doe</Typography>
                            <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>Admin</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mt: '0 !important' }} />
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <span>icon_check</span>
                        My Profile
                    </Box>
                </MenuItem>
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <span>icon_settings</span>
                        Settings
                    </Box>
                </MenuItem>
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <span>icon_check</span>
                        Billing
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem sx={{ p: 0 }} onClick={handleLogout}>
                    <Box sx={styles}>
                        <span>icon_check</span>
                        Sign Out
                    </Box>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default UserDropdown