import {Step} from "@prisma/client";
import React, {useState} from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import Icon from "@/components/Icon";
import OptionsMenuCard from "@/components/Utils/OptionsMenuCard";
import ActivitiesSlider from "@/components/Trips/Utils/ActivitiesSlider";
import ActivitySidebar from "@/components/Sidebars/ActivitySidebar";
import DialogActivities from "@/components/Dialogs/DialogActivities";
import {da} from "date-fns/locale";

interface Params {
    id: string
}

const WidgetActivities = ({tripId, activities, start, end, onSaveActivity, onUpdateActivity, onDeleteActivity} : {tripId: string | undefined, activities: Step[], start: Date, end: Date, onSaveActivity: (data: any) => void,onUpdateActivity: (data: any) => void, onDeleteActivity: (id: string) => void}) => {
    const [openModalActivities, setOpenModalActivities] = useState<boolean>(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    
    const [activityToUpdate, setActivityToUpdate] = useState<Step | undefined>(undefined);
    
    const ModalActivitiesData = {
        tripId,
        start,
        end,
        activities: activities
    }

    const saveActivity = (data: any) => {
        if(data.edit_mode) {
            onUpdateActivity(data)
        }
        else {
            onSaveActivity(data)
        }
        
        setOpenModalCreate(false)
    }
    
    const deleteActivity = (id: string) => {
        onDeleteActivity(id)
    }
    
    const onClickOpenModal = (date: Date) => {
        setActivityToUpdate(undefined)
        setSelectedDate(date)
        setOpenModalCreate(true)
    }
    
    const onClickOpenModalForUpdate = (id: string) => {
        setActivityToUpdate(activities.find(activity => activity.id === id))
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
                    <ActivitiesSlider start={start} end={end} activities={activities} handleOpenCreate={onClickOpenModal} />
                </CardContent>
            </Card>
            
            <ActivitySidebar open={openModalCreate} handleClose={() => setOpenModalCreate(false)} handleSubmitForm={saveActivity} defaultDate={selectedDate} start={start} end={end} defaultActivity={activityToUpdate}/>
            <DialogActivities open={openModalActivities} handleClose={() => setOpenModalActivities(false)} trip={ModalActivitiesData} onClickOpenCreate={() => {setActivityToUpdate(undefined);setOpenModalCreate(true)}} onClickOpenUpdate={onClickOpenModalForUpdate} onDeleteActivity={deleteActivity}></DialogActivities>
        </>

    )
}

export default WidgetActivities