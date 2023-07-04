import {useEffect, useState} from "react";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import axios from "axios";
import {Step} from "@prisma/client"
import WidgetActivities from "@/components/Trips/Widgets/WidgetActivities";
import toast from "react-hot-toast";

interface DataType {
    id: string,
    start: Date,
    end: Date,
    steps: Array<Step>
}

const General = ({
                     tripId,
                     isLoading,
                     handleLoading
                 }: { tripId: string, isLoading: boolean, handleLoading: (isLoading: boolean) => void }) => {
    const [tripData, setTripData] = useState<DataType>()


    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APPURL}/api/trip/${tripId}/general`)
            .then(response => {
                setTripData(response.data.trip)
                handleLoading(false)
            })
    }, [])


    const saveActivityToDb = (data: any) => {
        if (tripId) {
            data.tripId = tripId

            axios
                .post('/api/activity', {data})
                .then(response => {
                    if (response.data.status === "success") {
                        toast.success(`Une activité a été ajouté !`)

                        // Update data
                        const newData: any = {...tripData}
                        newData.steps = [...newData.steps, response.data.activity];
                        setTripData(newData)

                    }
                })
        }
    }

    const deleteActivityDb = (id: string) => {
        if(id) {
            axios
                .delete(`/api/activity/${id}`)
                .then((response) => {
                    // L'activité <nom> a été supprimé 
                    toast.success(`L'activité ${response.data.name} a été supprimée`)

                    const newData: any = {...tripData}
                    
                    // Remove activity
                    newData.steps = newData.steps.filter((activity: any) => activity.id !== response.data.id)
                    
                    setTripData(newData)

                })
                .catch(error => toast.error("Erreur lors de la suppression"))
        }
    }



    return (
        <>
            {isLoading
                ? (
                    <Box sx={{mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <CircularProgress sx={{mb: 4}}/>
                        <Typography>Chargement...</Typography>
                    </Box>
                )
                :
                (
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <WidgetActivities
                                tripId={tripData?.id}
                                activities={tripData?.steps as Step[]}
                                start={tripData?.start as Date}
                                end={tripData?.end as Date}
                                onSaveActivity={saveActivityToDb}
                                onDeleteActivity={deleteActivityDb}
                            />
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}

export default General