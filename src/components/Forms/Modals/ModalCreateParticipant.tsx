import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, FormControl, TextField} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import {useForm} from "react-hook-form";

// @ts-ignore
const ModalAddParticipant = ({
                                 open,
                                 handleClose,
                                 handleSubmitForm,
                                 defaultParticipant,
                             }: { open: boolean, handleClose: () => void, handleSubmitForm: (data: any) => void, defaultParticipant?: any | null }) => {

    const {register, handleSubmit, reset, setValue} = useForm({
        defaultValues: {
            name: defaultParticipant !== undefined ? defaultParticipant.name : '',
            userId: null,
            edit_mode: false,
        }
    });

    const onSubmit = (data: any) => {
        handleSubmitForm(data)
        handleClose()
    }


    useEffect(() => {
        if (open) {
            if(defaultParticipant !== undefined) {
                setValue("name", defaultParticipant.name)
                setValue("edit_mode", true)
            }
            else {
                setValue("name", "")
                setValue("edit_mode", false)
            }
        }
    }, [open])

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth={true}
                    aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title' sx={{display: 'flex', justifyContent: 'space-between'}}>
                    {defaultParticipant !== undefined ? "Éditer un participant" : "Nouveau participant"}
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{pt: theme => `${theme.spacing(2)} !important`}}>
                        <FormControl fullWidth={true}>
                            <TextField label='Nom' {...register("name")}></TextField>
                        </FormControl>
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <Button variant='contained' type='submit'>
                            {defaultParticipant !== undefined ? "Modifier" : "Créer"}
                        </Button>
                        <Button variant='outlined' onClick={handleClose}>Fermer</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )

}

export default ModalAddParticipant;
