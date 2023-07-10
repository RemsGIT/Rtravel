import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../../lib/prisma";

export default async function handlerParticipantById(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET' && req.method !== 'DELETE' && req.method !== 'PUT') {
        res.status(500).json({
            message: 'Sorry we only accept GET or DELETE or PUT method'
        })
    }
    const id = req.query.id as string
    switch (req.method){
        // case 'GET': getStep(id).then(s => res.json({byId: id, step: s})); break;
        case 'DELETE': removeParticipant(id).then(s => res.json(s)); break;
        case 'PUT': updateParticipant(id, req.body.data).then(s => res.json(s)); break;
    }
}


const removeParticipant = async (id: string) => {
    if(!!id) {
        return prisma.participant.delete({
            where: {id: id}
        });
    }

    return {
        success: false,
        message: "Participant ID missing"
    }

}

const updateParticipant = async (id: string, data: any) => {

    const body = {
        name: data.name,
        userId: data.userId,
    }
    
    if(!!body) {
        return prisma.participant.update({
            where: {id: id},
            data: {...body},
        })
    }

    return {
        success: false,
        message: "Data missing"
    }
}
