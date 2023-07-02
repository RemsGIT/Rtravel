import {Step} from "@prisma/client";
import React, {useState} from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import Icon from "@/components/Icon";
import OptionsMenuCard from "@/components/Utils/OptionsMenuCard";
import ActivitiesSlider from "@/components/Trips/Utils/ActivitiesSlider";
import CreateActivitySidebar from "@/components/Sidebars/CreateActivitySidebar";
import axios from "axios";
import toast from "react-hot-toast";
import DialogActivities from "@/components/Dialogs/DialogActivities";

interface Params {
    id: string
}

const WidgetActivities = ({tripId, activities, start, end} : {tripId: string | undefined, activities: Step[], start: Date, end: Date}) => {
    const [openModalActivities, setOpenModalActivities] = useState<boolean>(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [listActivities, setListActivities] = useState<Step[]>(activities)
    
    const ModalActivitiesData = {
        tripId,
        start,
        end,
        activities
    }

    const saveActivity = (data: any) => {
        if(tripId) {
            data.tripId = tripId

            axios
                .post('/api/activity', {data})
                .then(response => {
                    if(response.data.status === "success") {
                        toast.success(`Une activité a été ajouté !`)
                        
                        setListActivities([...activities, response.data.activity])
                    }
                    
                    setOpenModalCreate(false)
                })             
        }
    }
    
    const onClickOpenModal = (date: Date) => {
        setSelectedDate(date)
        setOpenModalCreate(true)
    }

    
    return (
        <>
            <Card>
                <CardHeader
                    title='Activités'
                    sx={{'& .MuiCardHeader-avatar': {mr: 2.5, pb: 0}}}
                    avatar={<Icon icon='mdi:chart-timeline-variant'/>}
                    titleTypographyProps={{sx: {color: 'text.primary'}}}
                    action= {
                        <OptionsMenuCard
                            options={[
                                {
                                    text: 'Gérer les activités',
                                    menuItemProps: {
                                        onClick: () => setOpenModalActivities(true)
                                    },
                                }
                            ]}
                        />
                    }
                />
                <CardContent>
                    <ActivitiesSlider start={start} end={end} activities={listActivities} handleOpenCreate={onClickOpenModal} />
                </CardContent>
            </Card>
            
            <CreateActivitySidebar open={openModalCreate} handleClose={() => setOpenModalCreate(false)}  handleSubmitForm={saveActivity} defaultDate={selectedDate} start={start} end={end}/>
            <DialogActivities open={openModalActivities} handleClose={() => setOpenModalActivities(false)} trip={ModalActivitiesData} onClickOpenCreate={() => setOpenModalCreate(true)}></DialogActivities>
        </>

    )
}

export default WidgetActivities