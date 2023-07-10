import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "../../../../lib/prisma";


interface ParticipantOnPost {
    name: string,
    tripId: string,
    userId: string | null
}

interface ParticipantOnDb {
    name: string,
    tripId: string,
    userId: string | null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if(session) {
        switch(req.method) {
            case 'POST': await createParticipant(req.body.data, res); break;
        }
    }
    else {
        res.status(500).json({status: "error", message: "user not logged in"})
    }
}

const createParticipant = async (participant: ParticipantOnPost, res: NextApiResponse) => {
    const newParticipantData: ParticipantOnDb = {
        name: participant.name,
        userId: participant.userId,
        tripId: participant.tripId
    }

    const newParticipantDb = await prisma.participant.create({data: newParticipantData});

    if(newParticipantDb) {
        res.status(200).json({status: "success", participant: newParticipantDb})
    }
    else {
        res.status(500).json({status: "error", message: "error creating the participant"})
    }
}