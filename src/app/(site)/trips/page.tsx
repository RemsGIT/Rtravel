"use client"
import TripSidebar from "@/components/Sidebars/TripSidebar";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import axios from "axios";
import {Trip} from "@prisma/client";
import List from "@/components/Trips/List";
import toast from "react-hot-toast";

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
    
    const saveTripDB = (data: any) => {
        axios
            .post('/api/trip', {data})
            .then(response => {
                if(response.data.status === "success") {
                    toast.success(`Voyage ${response.data.trip.name} créé !`)
                    
                    setUserTrips(oldArray => [...oldArray, response.data.trip])
                }
            })
    }

    return (
        <>
            <TripSidebar open={openModalCreate} handleClose={handleCloseModalCreate} handleSubmitForm={saveTripDB}/>
            
            <Button variant={"contained"} color={"primary"} onClick={() => setOpenModalCreate(true)}>Nouveau voyage</Button>
            
            {/* trips list */}
            <List trips={userTrips} />
        </>
    )
}
