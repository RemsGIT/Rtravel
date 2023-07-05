import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogConfirmation = ({open, handleNo, handleYes, title, message}: {open: boolean, handleNo: () => void, handleYes: () => void, title: string, message: any}) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                disableEscapeKeyDown
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {message}
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