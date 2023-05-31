import {useEffect, useState} from "react";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import axios from "axios";
import {Step} from "@prisma/client"
import WidgetActivities from "@/components/Trips/Widgets/WidgetActivities";

interface DataType {
    start: Date,
    end: Date,
    steps: Array<Step>
} 

const General = ({tripId,isLoading, handleLoading} : {tripId: string, isLoading: boolean, handleLoading: (isLoading: boolean) => void}) => {
    
    const [data, setData] = useState<DataType>()
    
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APPURL}/api/trips/${tripId}/general`)
            .then(response => {
                setData(response.data.trip)
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
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <WidgetActivities activities={data?.steps as Step[]} start={data?.start as Date} end={data?.end as Date} />
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}

export default General