import {useEffect, useState} from "react";
import axios from "axios";
import {
    Box, Button,
    CircularProgress,
    Tab,
    Typography
} from "@mui/material";
import {Trip} from "@prisma/client";
import {TabContext, TabPanel} from "@mui/lab";
import {styled} from "@mui/material/styles";
import {BoxProps} from "@mui/material/Box";
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import Icon from "@/components/Icon";
import CustomAvatar from "@/theme/CustomAvatar/CustomAvatar";
import GeneralForm from "@/components/Trips/Settings/GeneralForm";
import ImageForm from "@/components/Trips/Settings/ImageForm";
import toast from "react-hot-toast";
import DialogConfirmation from "@/components/Dialogs/DialogConfirmation";
import {useRouter} from "next/navigation";

const MuiBox = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
    overflow: 'visible',
    '& .MuiTabs-flexContainer': {
        flexDirection: 'column'
    },
    '& .MuiTabs-indicator': {
        display: 'none'
    },
    '& .Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
        minHeight: 40,
        minWidth: 280,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: theme.shape.borderRadius,
        '& svg': {
            marginBottom: 0,
            marginRight: theme.spacing(2)
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%'
        }
    }
}))

const Settings = ({
                     tripId,
                     isLoading,
                     handleLoading,
                     handleUpdate,
                     handleDelete,
                 }: { tripId: string, isLoading: boolean, handleLoading: (isLoading: boolean) => void, handleUpdate: (data: any) => void, handleDelete: (id: string) => void }) => {
    
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [tripData, setTripData] = useState<Trip>()
    const [activeTab, setActiveTab] = useState<string>('general');
    
    const router = useRouter()


    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APPURL}/api/trip/${tripId}/settings`)
            .then(response => {
                setTripData(response.data.trip)
                handleLoading(false)
            })
    }, [])
    
    const deleteTrip = () => {
        setOpenDialogDelete(false)
        setIsDeleting(true)
        toast.loading("Suppression du voyage en cours")
        
        handleDelete(tripId);
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
                    <MuiBox>
                        <TabContext value={activeTab}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <TabList>
                                    <Tab key={'general'} value={'general'} label={'Général'} icon={<Icon icon={'mdi:information-outline'} fontSize={20} />} onClick={() => setActiveTab('general')} sx={{textTransform: 'uppercase', fontWeight: 600}} />
                                    <Tab key={'picture'} value={'picture'} label={'Images'} icon={<Icon icon={'mdi:image-multiple-outline'} fontSize={20} />} onClick={() => setActiveTab('picture')} sx={{textTransform: 'uppercase', fontWeight: 600}} />
                                </TabList>
                            </Box>
                            
                            {/* Tabs content */}
                            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                <TabPanel key={'general'} value={'general'} sx={{ p: { xs: 0, md: 6 }, width: '100%', pt: { xs: 6, md: 0 }, pl: { xs: 0, md: 6 } }}>
                                    <Box key={'general'}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CustomAvatar skin='light' variant='rounded' sx={{ height: 50, width: 50 }}>
                                                <Icon icon={'mdi:information-outline'} fontSize={30} />
                                            </CustomAvatar>                                        <Box sx={{ ml: 4 }}>
                                            <Typography variant='h5'>Général</Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>Informations générales du voyage</Typography>
                                        </Box>
                                        </Box>
                                        <Box sx={{mt: 5}}>
                                            <GeneralForm data={tripData} isDeleting={isDeleting} handleUpdate={handleUpdate}/>
                                        </Box>
                                    </Box>
                                </TabPanel>
                                <TabPanel key={'picture'} value={'picture'} sx={{ p: 6, width: '100%', pt: { xs: 6, md: 0 }, pl: { xs: 0, md: 6 } }}>
                                    <Box key={'picture'}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CustomAvatar skin='light' variant='rounded' sx={{ height: 50, width: 50 }}>
                                                <Icon icon={'mdi:image-multiple-outline'} fontSize={30} />
                                            </CustomAvatar>                                        <Box sx={{ ml: 4 }}>
                                            <Typography variant='h5'>Images</Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>Différentes images du voyage</Typography>
                                        </Box>
                                        </Box>
                                        <Box sx={{mt: 5}}>
                                         <ImageForm data={tripData} />
                                        </Box>
                                    </Box>
                                </TabPanel>

                                <Box sx={{ p: 6, m: '0 auto', pt: { xs: 6, md: 0 }, pl: { xs: 0, md: 6 } }}>
                                    <Button variant={"contained"} color={"error"} sx={{display: 'block',fontSize: '12px', px: 6, fontWeight: 600}} disabled={isDeleting} onClick={() => setOpenDialogDelete(true)}>Supprimer le voyage</Button>
                                </Box>
                            </Box>

                        </TabContext>
                        <DialogConfirmation 
                            open={openDialogDelete}
                            title={"Supprimer un voyage"}
                            message={"Voulez-vous vraiment supprimer ce voyage ? Toutes les données associées seront supprimées"}
                            handleYes={deleteTrip}
                            handleNo={() => setOpenDialogDelete(false)}
                        />
                    </MuiBox>
                )
            }
        </>
    )
}

export default Settings