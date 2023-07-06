import {Step} from "@prisma/client";
import {styled} from "@mui/material/styles";
import MuiTimeline, {TimelineProps} from '@mui/lab/Timeline'
import {useEffect, useState} from "react";
import {useKeenSlider} from "keen-slider/react";
import KeenSliderWrapper from "@/theme/libs/keen-slider";
import {Box, Button, Typography} from "@mui/material";
import Icon from "@/components/Icon";
import clsx from "clsx";
import {TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import ArrowEmptyData from "@/components/Utils/ArrowEmptyData";
import {toFrenchDate, uppercaseFirst} from "@/app/utils";
import {format} from "date-fns";

// Styled components
const Timeline = styled(MuiTimeline)<TimelineProps>({
    paddingLeft: 0,
    paddingRight: 0,
    '& .MuiTimelineItem-root': {
        width: '100%',
        '&:before': {
            display: 'none'
        }
    }
})

// Utils functions
const getDaysOfTrip = (start: Date, end: Date) => {
    for (var a = [], d = new Date(start); d <= new Date(end); d.setDate(d.getDate() + 1)) {
        a.push(new Date(d));
    }

    return a
}

const filterActivitiesByDay = (activities: Step[], date: Date) => {
    return activities.filter(step => new Date(step.start).toDateString() === date.toDateString())
}

const ActivitiesSlider = ({start, end, activities, handleOpenCreate}: { start: Date, end: Date, activities: Step[] , handleOpenCreate : (date: Date) => void}) => {

    const days = getDaysOfTrip(start, end)

    // If today is in the list : slider must start to this date
    const today = days.find(day => new Date(day).toDateString() === new Date().toDateString())
    const startIndexSlider = today ? days.findIndex(day => new Date(day).toDateString() === new Date().toDateString()) : 0

    // * Hooks
    const [visibleActivities, setVisibleActivities] = useState<Array<Step>>(activities ?? [])
    const [loaded, setLoaded] = useState<boolean>(false)
    const [currentSlide, setCurrentSlide] = useState<number>(startIndexSlider)
    const [dateSlider, setDateSlider] = useState<Date>(today ? today : days[0])


    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        rtl: false,
        initial: today ? startIndexSlider : 0,
        slideChanged(slider) {
            const index = slider.track.details.rel
            setDateSlider(days[index])
            
            setTimeout(() => {
                setCurrentSlide(index)
            }, 100)
        },
        created() {
            setLoaded(true)
        }
    })
    
    useEffect(() => {
        setVisibleActivities(activities)
    }, [dateSlider])

    return (
        <KeenSliderWrapper>
            {loaded && instanceRef.current && (
                <Box sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
                    {/* LEFT SLIDE BUTTON */}
                    <Button
                        variant="contained" sx={{margin: '10px'}}
                        disabled={currentSlide === 0}
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                    >
                        <Icon
                            icon='mdi:chevron-left'
                            className={clsx('arrow arrow-left', {
                                'arrow-disabled': currentSlide === 0
                            })}
                        />
                    </Button>

                    {/* Center date */}
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                        userSelect: 'none'
                    }}>{uppercaseFirst(toFrenchDate(dateSlider, true))}</Typography>

                    {/* RIGHT SLIDE BUTTON */}
                    <Button variant="contained" sx={{margin: '10px'}}
                            disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                    >
                        <Icon
                            icon='mdi:chevron-right'
                            className={clsx('arrow arrow-right', {
                                'arrow-disabled': currentSlide === instanceRef.current.track.details.slides.length - 1
                            })}
                        />
                    </Button>

                </Box>
            )}
            
            <div ref={sliderRef} className="keen-slider">
                {days.map(day => (
                    <Box className='keen-slider__slide' key={"item-"+day}>
                        <Timeline sx={{ml: 1}} key={"item-"+day}>
                            {filterActivitiesByDay(activities, day).length > 0 ? filterActivitiesByDay(activities, day).map(step => (
                                <TimelineItem key={step.id}>
                                    <TimelineSeparator>
                                        <TimelineDot color='error'/>
                                        <TimelineConnector/>
                                    </TimelineSeparator>
                                    <TimelineContent sx={{mt: 0, mb: theme => `${theme.spacing(2.75)} !important`}}>
                                        <Box
                                            sx={{
                                                mb: 2.5,
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography sx={{mr: 2, fontWeight: 600}}>{step.name}</Typography>
                                            <Typography variant={"body1"} sx={{color: 'text.disabled', fontSize: '15px', fontWeight: 'bold'}}>
                                                { format(new Date(step.start), 'HH:mm') }
                                            </Typography>
                                        </Box>
                                        <Typography variant='body2' sx={{mb: 2}}>
                                            {step.description}
                                        </Typography>
                                        {/*
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <img width={24} height={24} alt='' src=''/>
                                            <Typography variant='subtitle2' sx={{ml: 2, fontWeight: 600}}>
                                                invoice.pdf
                                            </Typography>
                                        </Box>
                                        */}
                                    </TimelineContent>
                                </TimelineItem>
                            )) : (
                                <Box sx={{display: 'flex', alignItems:'center', flexDirection:'column'}}>
                                    <Typography sx={{pb:2}} variant='subtitle2'>
                                        Aucune activité pour ce jour
                                    </Typography>
                                    <ArrowEmptyData width={80} height={80}/>
                                    <Button variant={"contained"} sx={{mt: 5}} onClick={() => handleOpenCreate(dateSlider)}>Ajouter une activité</Button>
                                </Box>
                            )}
                        </Timeline>
                    </Box>
                ))}
            </div>
        </KeenSliderWrapper>
    )
}

export default ActivitiesSlider