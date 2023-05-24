"use client"
import CreateTripSidebar from "@/components/Sidebars/CreateTripSidebar";
import {useState} from "react";
import {Button} from "@mui/material";

export default function Trips() {
    
    //  HOOKS
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

    // Modal create events
    const handleCloseModalCreate = () => setOpenModalCreate(false)

    return (
        <>
            <CreateTripSidebar open={openModalCreate} handleClose={handleCloseModalCreate}/>
            
            <Button variant={"contained"} color={"primary"} onClick={() => setOpenModalCreate(true)}>Nouveau voyage</Button>
        </>
    )
}
