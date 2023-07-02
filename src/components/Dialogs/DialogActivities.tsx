import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import Icon from "@/components/Icon";
import TableTripActivities from "@/components/DataTables/TableTripActivities";

interface DialogActivitiesType {
    tripId: string | undefined,
    start: Date,
    end: Date,
   activities: Array<any> 
}

const DialogActivities = ({open, handleClose, trip, onClickOpenCreate} : {open: boolean, handleClose: () => void, trip: DialogActivitiesType, onClickOpenCreate: () => void}) => {
    
    return (
        <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open}>
            <Toolbar sx={{backgroundColor: 'primary.main'}}>
                <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    >
                    <Icon icon='mdi:close' color={'white'} />
                </IconButton>
                <Typography variant='h6' component='span' color={"white"} sx={{ml: 2}}>
                    Gestion des activités
                </Typography>
                
                <Button variant={"contained"} color={"inherit"} sx={{ top: 8, right: 10, position: 'absolute'}} onClick={onClickOpenCreate}>
                    <Icon icon={"mdi:plus-thick"} />
                    Ajouter
                </Button>
            </Toolbar>
            <DialogContent>
                <TableTripActivities activities={trip.activities} />
            </DialogContent>
        </Dialog>
    )
}

export default DialogActivities