import {Step} from "@prisma/client";
import React, {useState} from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import Icon from "@/components/Icon";
import OptionsMenuCard from "@/components/Utils/OptionsMenuCard";
import ActivitiesSlider from "@/components/Trips/Utils/ActivitiesSlider";

const WidgetActivities = ({activities, start, end} : {activities: Step[], start: Date, end: Date}) => {
    const [listActivities, setListActivities] = useState<Step[]>(activities)

    return (
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
                                    onClick: () => console.log('click')
                                },
                            }
                        ]}
                    />
                }
            />
            <CardContent>
                <ActivitiesSlider start={start} end={end} activities={activities} />
            </CardContent>
        </Card>
    )
}

export default WidgetActivities