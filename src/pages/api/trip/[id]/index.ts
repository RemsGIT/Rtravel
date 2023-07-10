import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../../../lib/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    
    if (req.method !== 'GET' && req.method !== 'DELETE' && req.method !== 'PUT' && !session) {
        return res.status(500).json({
            message: 'Sorry we only accept GET or DELETE or PUT method'
        })
    }

    const id = req.query.id as string

    if (!id) {
        return res.status(500).json({
            message: 'Missing params'
        })
    }

    switch (req.method) {
        case 'GET': await getTripById(id, session?.user, res); break;
        case 'DELETE': await deleteTripById(id, session?.user, res); break;
        case 'PUT': await updateTripById(id, req.body.data, session?.user, res); break;
    }
}


/**
 * Retrieve user's trip by ID 
 * @param id
 * @param user
 * @param res
 */
async function getTripById(id: string, user: any, res: NextApiResponse) {
    // Check if the trip's owner is who sending the request
    const trip = await prisma.trip.findFirst({
        where: {id, creatorId: user.id}
    });
    
    if(trip) {
        return res.status(200).json({status: "success", trip})
    }
    else {
        return res.status(500).json({message: "The trip does not exists or you are not the owner"})
    }
}  

async function deleteTripById(id: string, user: any, res: NextApiResponse) {
    const tripDeleted = await prisma.trip.deleteMany({
        where: {id, creatorId: user.id}
    })

    if(tripDeleted) {
        return res.status(200).json({status: "success", result: tripDeleted})
    }
    else {
        return res.status(500).json({message: "The trip does not exists or you are not the owner"})
    }
}

async function updateTripById(id: string, data: any, user: any, res: NextApiResponse) {

    const trip = await prisma.trip.findFirst({
        where: {id, creatorId: user.id}
    });
    
    if(trip) {
        const tripUpdated = await prisma.trip.update({
            where: {id: trip.id},
            data: data
        })

        return res.status(200).json({status: "success", tripUpdated})
    }

    return res.status(500).json({message: "The trip does not exists or you are not the owner"})



}