"use client"
import {Box, Grid, useMediaQuery, Tab} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import General from "@/components/Trips/Tabs/General";
import Team from "@/components/Trips/Tabs/Team";
import Header from "@/components/Trips/Utils/Header";
import {Trip} from "@prisma/client";
import axios from "axios";
import {styled, Theme} from "@mui/material/styles";

import {TabContext, TabPanel} from "@mui/lab";
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import Icon from "@/components/Icon";
import Settings from "@/components/Trips/Settings/Settings";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

// Styled components
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
    '& .MuiTabs-indicator': {
        display: 'none'
    },
    '& .Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
        minWidth: 65,
        minHeight: 38,
        paddingTop: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('sm')]: {
            minWidth: 130
        }
    }
}))

interface Params {
    id: string
}

const Trip = ({params} : {params: Params}) => {
    const router = useRouter()
    const [trip, setTrip] = useState<Trip>();
    const [tabActive, setTabActive] = useState<string>("0");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))


    const handleLoading = (isLoading: boolean) => {
        setIsLoading(isLoading)
    }
    
    const handleChangeTab = (event: SyntheticEvent, value: string) => {
        setIsLoading(true)
        setTabActive(value)
    }
    
    const deleteTrip = (id: string) => {
        axios
            .delete(`/api/trip/${id}`)
            .then(res => {
                if(res.data.status === "success" && res.data.result.count > 0) {
                    toast.remove()
                    toast.success("Le voyage a bien été supprimé")

                    // redirect user to trip list after delete
                    router.push("/trips")
                }
            })
    }
    
    const updateTrip = (data: any) => {
        axios
            .put(`/api/trip/${data.id}`, {data})
            .then(response => {
                if(response.data.status === "success" && response.data.tripUpdated) {
                    toast.success("Des informations du voyage ont été modifiées")

                    setTrip(response.data.tripUpdated)
                }
            })
    }
    
    useEffect(() => {
        // Get data for header
        axios
            .get(`${process.env.NEXT_PUBLIC_APPURL}/api/trip/${params.id}`)
            .then(response => (
                setTrip(response.data.trip)
            ))
    }, [])
 
    return (
        <>
            <Grid container spacing={6}>
                {/* Header of the trip */}
                <Grid item xs={12}>
                    <Header trip={trip} />
                </Grid>
                
                {/* Menu and content */}
                <Grid item xs={12}>
                    <TabContext value={tabActive}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <TabList
                                    variant='scrollable'
                                    scrollButtons={'auto'}
                                    onChange={handleChangeTab}
                                    aria-label='customized tabs example'
                                >
                                    <Tab
                                        value='0'
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                                <Icon fontSize={20} icon='mdi:information-outline' />
                                                {!hideText && 'Général'}
                                            </Box>
                                        }
                                    />
                                    <Tab
                                        value='1'
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                                <Icon fontSize={20} icon='mdi:account-group' />
                                                {!hideText && 'Participants'}
                                            </Box>
                                        }
                                    />
                                    <Tab
                                        value='3'
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                                <Icon fontSize={20} icon='mdi:cog' />
                                                {!hideText && 'Paramètres'}
                                            </Box>
                                        }
                                    />
                                    <Tab
                                        value='2'
                                        disabled={true}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                                <Icon fontSize={20} icon='mdi:cash' />
                                                {!hideText && 'Budget'} (prochainement)
                                            </Box>
                                        }
                                    />
                                </TabList>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                                <TabPanel sx={{ p: 0 }} value={tabActive}>
                                    {tabActive === "0" && <General tripId={params.id} isLoading={isLoading} handleLoading={handleLoading} />}
                                    {tabActive === "1" && <Team tripId={params.id} isLoading={isLoading}  handleLoading={handleLoading}/>}
                                    {tabActive === "3" && <Settings tripId={params.id} isLoading={isLoading}  handleLoading={handleLoading} handleUpdate={updateTrip} handleDelete={deleteTrip}/>}
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </TabContext>
                </Grid>
            </Grid>
        </>
    
    )
}

export default Trip;

