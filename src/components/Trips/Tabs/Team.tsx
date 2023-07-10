import {useEffect, useState} from "react";
import {Avatar, Box, Button, Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import axios from "axios";
import OptionsMenuCard from "@/components/Utils/OptionsMenuCard";
import ModalAddParticipant from "@/components/Forms/Modals/ModalCreateParticipant";

const Team = ({tripId, isLoading, handleLoading} : {tripId: string, isLoading: boolean, handleLoading: (isLoading: boolean) => void}) => {

    const [openModalParticipant, setOpenModalParticipant] = useState<boolean>(false)
    const [participantList, setParticipantList] = useState<any>([])
    const [participantToEdit, setParticipantToEdit] = useState<any>(undefined)

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

    const saveActivityToDb = (data: any) => {
        console.log(data)
    }

    const updateActivityDb = (data: any) => {
        if(data) {
            // code
        }
    }

    const deleteActivityDb = (id: string) => {
        if(id) {
            // code
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
                                                                            console.log('remove')
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

                        <ModalAddParticipant open={openModalParticipant} handleClose={() => setOpenModalParticipant(false)} handleSubmitForm={saveActivityToDb} defaultParticipant={participantToEdit}/>
                    </>
                )
            }
        </>
    )
}

export default Team