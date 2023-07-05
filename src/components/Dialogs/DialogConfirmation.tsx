import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogConfirmation = ({open, handleNo, handleYes}: {open: boolean, handleNo: () => void, handleYes: () => void}) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                disableEscapeKeyDown
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Let Google help apps determine location. This means sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={handleNo}>Annuler</Button>
                    <Button onClick={handleYes}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DialogConfirmation