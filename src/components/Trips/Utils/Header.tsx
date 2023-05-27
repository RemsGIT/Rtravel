import {Trip} from "@prisma/client";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import Icon from "@/components/Icon";

const ProfilePicture = styled('img')(({theme}) => ({
    width: 120,
    height: 120,
    borderRadius: theme.shape.borderRadius,
    border: `5px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    }
}))

const Header = ({trip}: { trip: Trip | undefined }) => {
    
    if (trip === undefined) return <p></p>
    
    return (
        <Card>
            {/* Background */}
            <CardMedia
                component={"img"}
                alt={"profile-header"}
                image={"https://picsum.photos/1250/300"}
                sx={{height: {xs: 150, md: 300}}}
            />
            <CardContent
                sx={{
                    pt: 0,
                    mt: -5,
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexWrap: {xs: 'wrap', md: 'nowrap'},
                    justifyContent: {xs: 'center', md: 'flex-start'}
                }}
            >
                {/* Content */}
                <ProfilePicture src={'https://picsum.photos/120/120'} alt='profile-picture'/>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        ml: {xs: 0, md: 6},
                        alignItems: 'flex-end',
                        flexWrap: ['wrap', 'nowrap'],
                        justifyContent: ['center', 'space-between']
                    }}
                >
                    {/* Info -> name, city and start */}
                    <Box sx={{
                        mb: [6, 0],
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: ['center', 'flex-start']
                    }}>
                        <Typography variant='h4' sx={{ mb: 1 }}>{trip.name}</Typography>

                        <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                            <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                                <Icon icon='mdi:map-marker-outline' />
                                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>{trip.city}</Typography>
                            </Box>
                            <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                                <Icon icon='mdi:airplane-clock' />
                                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}> Départ le {trip.start.toString()}</Typography>
                            </Box>
                        </Box>

                    </Box>
                    <Button variant={'contained'} color={'warning'} startIcon={<Icon icon='mdi:timer-sand-full' fontSize={20}/>}>PERIOD</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Header