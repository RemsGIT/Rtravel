import Team from "@/components/Trips/Tabs/Team";
import {useEffect, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

const General = ({isLoading, handleLoading} : {isLoading: boolean, handleLoading: (isLoading: boolean) => void}) => {
    useEffect(() => {
        console.log('general')
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
                    <p>tab general</p>
                )
            }
        </>
    )
}

export default General