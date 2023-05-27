import {useEffect} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

const Team = ({isLoading, handleLoading} : {isLoading: boolean, handleLoading: (isLoading: boolean) => void}) => {

    useEffect(() => {
        console.log('team')
        setTimeout(() => {
            handleLoading(false)
        }, 1000)
    }, [])


    return (
        <>
            {isLoading
                ? (
                    <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <CircularProgress sx={{ mb: 4 }} />
                        <Typography>Chargement...</Typography>
                    </Box>
                )
                :
                (
                    <p>tab team</p>
                )
            }
        </>
    )
}

export default Team