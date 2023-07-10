import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import WidgetMap from "@/components/Dashboard/Widgets/WidgetMap";

const UserDashboard = () => {
    const { data: session, status } = useSession()
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card className="widget-map-container">
                    <CardHeader title="Ma carte"/>
                    <CardContent className="card-map">
                        <WidgetMap />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserDashboard