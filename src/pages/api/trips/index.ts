import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

interface tripRequest {
    name: string,
    start: Date,
    end: Date,
    vehicle: string
}

interface newTripType {
    name: string,
    city: string,
    start: Date,
    end: Date,
    vehicle: string,
    creatorId: string
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if(session) {
        switch(req.method) {
            case 'GET': await getUserTrips(session?.user, res); break;
            case 'POST': await createTrip(req.body.data, session?.user, res); break;
        }
    }
    else {
        res.status(500).json({status: "error", message: "user not logged in"})
    }
}

async function getUserTrips(user: any, res: NextApiResponse) {
    const trips = await prisma.trip.findMany({
        where: {creatorId: user.id}
    })

    res.status(200).json({status: "success", trips})
}

async function createTrip(trip: tripRequest, user: any, res: NextApiResponse) {
    
    const newTripData: newTripType = {
        name: trip.name,
        city: 'temporary',
        start: trip.start,
        end: trip.end,
        vehicle: trip.vehicle,
        creatorId: user.id
    }

    const newTrip = await prisma.trip.create({
        data: newTripData
    })
    

    if(newTrip) {
        res.status(200).json({status: "success", trip: newTrip})
    }
    else {
        res.status(500).json({status: "error", message: "error creating the trip"})
    }
}