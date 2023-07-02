"use client"
import CreateTripSidebar from "@/components/Sidebars/CreateTripSidebar";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import axios from "axios";
import {Trip} from "@prisma/client";
import List from "@/components/Trips/List";

export default function Trips() {
    
    //  HOOKS
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [userTrips, setUserTrips] = useState<Array<Trip>>([]);

    // Modal create events
    const handleCloseModalCreate = () => setOpenModalCreate(false)
    
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APPURL}/api/trip`)
            .then(r => {
                setUserTrips(r.data.trips)
            })
    }, [])

    return (
        <>
            <CreateTripSidebar open={openModalCreate} handleClose={handleCloseModalCreate}/>
            
            <Button variant={"contained"} color={"primary"} onClick={() => setOpenModalCreate(true)}>Nouveau voyage</Button>

            {/* trips list */}
            <List trips={userTrips} />
        </>
    )
}
