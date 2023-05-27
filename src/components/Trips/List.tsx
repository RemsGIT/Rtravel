import {Trip} from "@prisma/client";
import React from "react";
import {Grid} from "@mui/material";
import Card from "@/components/Trips/Card";

const List = ({trips}: {trips: Array<Trip>}) => {
    return (
        <Grid container spacing={6} sx={{mt:2}}>
            { trips.length > 0 ? trips.map(trip => (
                <Grid item xs={6} md={4} xl={3} key={trip.id}>
                    <Card trip={trip} />
                </Grid>
            )) : <p>Aucun voyage</p>}
        </Grid>
    )
}

export default List;