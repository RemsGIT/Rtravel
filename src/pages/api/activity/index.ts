import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Step} from "@prisma/client";
import prisma from "../../../../lib/prisma";


interface ActivityOnPost {
    name: string,
    city: string,
    type: string,
    start: Date,
    tripId: string
}

interface ActivityDatabase {
    name: string,
    city: string,
    type: string,
    start: Date,
    tripId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if(session) {
        switch(req.method) {
            case 'POST': await createActivity(req.body.data, res); break;
        }
    }
    else {
        res.status(500).json({status: "error", message: "user not logged in"})
    }
}

const createActivity = async (activity: ActivityOnPost, res: NextApiResponse) => {
    const newActivityData: ActivityDatabase = {
        name: activity.name,
        city: activity.city,
        start: activity.start,
        type: activity.type,
        tripId: activity.tripId
    }
    
    const newActivityDb = await prisma.step.create({data: newActivityData});
    
    if(newActivityDb) {
        res.status(200).json({status: "success", activity: newActivityDb})
    }
    else {
        res.status(500).json({status: "error", message: "error creating the activity"})
    }
}