import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "../../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (req.method !== 'GET' && !session) {
        return res.status(500).json({
            message: 'Sorry we only accept GET method'
        })
    }
    
    const id = req.query.id as string

    // @ts-ignore
    const userId: string = session?.user?.id ?? ''

    // Get data of trip : 
    //  - dates
    //  - activities
    const trip = await prisma.trip.findFirst({
        where: {
            id: id,
            creatorId: userId
        },
        select: {
            id: true,
            start: true,
            end: true,
            steps: true
        }
    })
    
    if(trip) {
        return res.status(200).json({status: "success", trip})
    }
    else {
        return res.status(500).json({message: "The trip does not exists or you are not the owner"})
    }
    
}