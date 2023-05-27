import {Trip} from ".prisma/client";

import {Box, Button, Card as MuiCard, CardMedia, Typography} from "@mui/material";
import Icon from "@/components/Icon";
import {useRouter} from "next/navigation";

const Card = ({trip} : {trip: Trip}) => {
    
    const router = useRouter();
    
    const handleClick = () => {
        router.push(`trips/${trip.id}`)
    }
    
    return (
        <MuiCard sx={{cursor: 'pointer', borderRadius: '20px'}} onClick={handleClick}>
            <Box sx={{position: 'relative'}}>
                <CardMedia
                    component={"img"}
                    height={"300"}
                    image={"https://images.unsplash.com/photo-1481277542470-605612bd2d61"}
                />
                <Box
                    sx={{position: 'absolute',right: "10px",top: "10px"}}
                >
                    <Button variant={"contained"} color={"success"} sx={{px: "7px", py: "4.2px", fontSize: "13px", width: "max-content", minWidth: "30px", height:'25px', fontWeight: "900"}}>(dans) 3</Button>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        padding: "10px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0) 75%, rgba(0,0,0,0.14216984463276838) 82%, rgba(0,0,0,0.48397775423728817) 89%, rgba(0,0,0,0.6873675847457628) 100%);"
                    }}
                >
                    <Typography variant="h5" color={"white"}>{trip.name}</Typography>
                    <Typography variant="body2" color={"white"} fontSize={'12px'}>
                        <Box>
                            <Icon icon='mdi:city' style={{verticalAlign: "bottom"}} fontSize={'20px'} /> {trip.city}
                            <Icon icon='mdi:calendar' style={{verticalAlign: "bottom", marginLeft: "5px"}} fontSize={'20px'}/> dates
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </MuiCard>
    )
}

export default Card