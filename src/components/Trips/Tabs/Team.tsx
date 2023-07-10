import {useEffect, useState} from "react";
import {Avatar, Box, Button, Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import OptionsMenuCard from "@/components/Utils/OptionsMenuCard";
import ModalAddParticipant from "@/components/Forms/Modals/ModalCreateParticipant";
import toast from "react-hot-toast";
import DialogConfirmation from "@/components/Dialogs/DialogConfirmation";

const Team = ({tripId, isLoading, handleLoading} : {tripId: string, isLoading: boolean, handleLoading: (isLoading: boolean) => void}) => {

    const [openModalParticipant, setOpenModalParticipant] = useState<boolean>(false)
    const [openDeleteDialogConfirmation, setOpenDeleteDialogConfirmation] = useState<boolean>(false)
    const [participantList, setParticipantList] = useState<any>([])
    const [participantToEdit, setParticipantToEdit] = useState<any>(undefined)
    const [IDdeleteParticipant, setIDdeleteParticipant] = useState<string>("")

    
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APPURL}/api/trip/${tripId}/team`)
            .then(response => {
                if(response.data.trip.participants) {
                    setParticipantList(response.data.trip.participants)
                    handleLoading(false)
                }

            })
    }, [])

    const saveParticipantToDb = (data: any) => {
        data.tripId = tripId
        
        axios
            .post("/api/participant", {data})
            .then((response: AxiosResponse) => {
                if(response.data.status === "success") {
                    toast.success(`${response.data.participant.name} a été ajouté au voyage `)
                    setParticipantList((oldArray: any) => [...oldArray, response.data.participant])

                }
            })
    }

    const updateParticipantDb = (data: any) => {
        if(data) {
            // code
        }
    }

    const deleteParticipantDb = () => {
        if(!!IDdeleteParticipant) {
            axios
                .delete(`/api/participant/${IDdeleteParticipant}`)
                .then((response: AxiosResponse) => {
                    console.log(response)
                    if(response.data) {
                        toast.remove()
                        toast.success(`${response.data.name} a été retiré du voyage`)
                        
                        // Remove the participant from UI
                        setParticipantList((prevParticipantList: any) => prevParticipantList.filter((participant: any) => participant.id !== IDdeleteParticipant));

                        
                        setOpenDeleteDialogConfirmation(false)
                    }
                })
        }
    }


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
                    <>
                        <Button variant="contained" sx={{float: 'right'}} onClick={() => {
                            setParticipantToEdit(undefined)
                            setOpenModalParticipant(true)
                        }}>Nouveau participant</Button>
                        <Grid container spacing={6}>
                            {participantList.map(//@ts-ignore
                                participant => (
                                    <Grid item xs={12} sm={6} lg={4} key={participant.id}>
                                        <Card>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Avatar src={`https://robohash.org/${participant.id}`} sx={{ mr: 2.5, height: 38, width: 38 }} />
                                                        <Typography variant='h6' sx={{pt: 2}}>{participant.name || 'Titre'}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <OptionsMenuCard
                                                            iconButtonProps={{ size: 'small' }}
                                                            options={[
                                                                {
                                                                    text: 'Associer une dépense',
                                                                    menuItemProps: {
                                                                        onClick: () => console.log('add price')
                                                                    },
                                                                },
                                                                'Voir le détail',
                                                                {
                                                                    text: 'Renommer',
                                                                    menuItemProps: {
                                                                        onClick: () => {
                                                                            setParticipantToEdit(participant)
                                                                            setOpenModalParticipant(true)
                                                                        }
                                                                    }
                                                                },
                                                                { divider: true },
                                                                {
                                                                    text: 'Supprimer',
                                                                    menuItemProps: {
                                                                        onClick: () => {
                                                                            setIDdeleteParticipant(participant.id)
                                                                            setOpenDeleteDialogConfirmation(true)
                                                                        },
                                                                        sx: { color: 'error.main' }
                                                                    }
                                                                }
                                                            ]}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ mt:8, pb:3, display: 'flex', justifyContent: 'center' }}>
                                                    <Typography sx={{ color: 'text.secondary' }}>Aucune dépense associée</Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>

                        <ModalAddParticipant open={openModalParticipant} handleClose={() => setOpenModalParticipant(false)} handleSubmitForm={saveParticipantToDb} defaultParticipant={participantToEdit}/>
                        <DialogConfirmation
                            open={openDeleteDialogConfirmation}
                            handleNo={() => setOpenDeleteDialogConfirmation(false)}
                            handleYes={deleteParticipantDb}
                            title={"Retirer un participant"}
                            message={"Voulez-vous vraiment retirer ce participant du voyage ?"}
                        />  
                    </>
                )
            }
        </>
    )
}

export default Team