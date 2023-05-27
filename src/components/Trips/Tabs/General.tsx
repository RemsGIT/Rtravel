import Team from "@/components/Trips/Tabs/Team";
import {useEffect, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import axios from "axios";

const General = ({tripId,isLoading, handleLoading} : {tripId: string, isLoading: boolean, handleLoading: (isLoading: boolean) => void}) => {
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APPURL}/api/trips/${tripId}/general`)
            .then(response => {
                console.log(response)

                handleLoading(false)

            })
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