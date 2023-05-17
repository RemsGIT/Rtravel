"use client"
import ModalCreateTrip from "@/components/Modals/ModalCreateTrip";
import {useState} from "react";
import {Button} from "@mui/material";

export default function Trips() {
    
    //  HOOKS
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

    // Modal create events
    const handleCloseModalCreate = () => setOpenModalCreate(false)

    return (
        <>
            <ModalCreateTrip open={openModalCreate} handleClose={handleCloseModalCreate}/>
            
            <Button variant={"contained"} color={"primary"} onClick={() => setOpenModalCreate(true)}>Nouveau voyage</Button>
        </>
    )
}
