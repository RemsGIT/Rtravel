import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";

const ModalCreateTrip = ({open, handleClose}: { open: boolean, handleClose: () => void }) => {

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            name: "",
            start: "",
            end: "",
            vehicle: "",
        }
    });

    const onClose = () => {
        // Reset the form before closing modal
        reset()
        handleClose()
    }

    const onSubmit = (data: any) => {
        console.log(data)

        reset()
        handleClose()
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth={true}>
                <DialogTitle id='form-dialog-title'>
                    Nouveau voyage
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{pt: theme => `${theme.spacing(2)} !important`}}>
                        <FormControl fullWidth={true} sx={{mt: 8}}>
                            <TextField label={"Nom"}  {...register("name")}/>
                        </FormControl>
                        <FormControl fullWidth={true} sx={{mt: 4}}>
                            <TextField label={"Début"}  {...register("start")}/>
                        </FormControl>
                        <FormControl fullWidth={true} sx={{mt: 4}}>
                            <TextField label={"Fin"}  {...register("end")}/>
                        </FormControl>
                        <FormControl fullWidth={true} sx={{mt: 4}}>
                            <InputLabel>Véhicule</InputLabel>
                            <Select label={"Véhicule"} {...register("vehicle")}>
                                <MenuItem value={'car'}>Voiture</MenuItem>
                                <MenuItem value={'bus'}>Bus</MenuItem>
                                <MenuItem value={'train'}>Train</MenuItem>
                                <MenuItem value={'plane'}>Avion</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button type={"submit"} variant={"contained"} color={"success"}>Sauvegarder</Button>
                        <Button variant={"outlined"} onClick={onClose} color={"error"}>Fermer</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default ModalCreateTrip