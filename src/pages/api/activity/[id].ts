import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../../lib/prisma";

export default async function handlerActivityById(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET' && req.method !== 'DELETE' && req.method !== 'PUT') {
        res.status(500).json({
            message: 'Sorry we only accept GET or DELETE or PUT method'
        })
    }
    const id = req.query.id as string
    switch (req.method){
       // case 'GET': getStep(id).then(s => res.json({byId: id, step: s})); break;
        case 'DELETE': removeStep(id).then(s => res.json(s)); break;
        case 'PUT': updateStep(id, req.body).then(s => res.json(s)); break;
    }
}


const removeStep = async (id: string) => {
    if(!!id) {
        return prisma.step.delete({
            where: {id: id}
        });
    }
    
    return {
        success: false,
        message: "Activity ID missing"
    }

}

const updateStep = async (id: string, data: any) => {
    
    const body = {
        name: data.name,
        type: data.type,
        city: data.city,
        start: data.start
    }
    
    if(!!body) {
        return prisma.step.update({
            where: {id: id},
            data: {...body},
        })
    }

    return {
        success: false,
        message: "Data missing"
    }
}
