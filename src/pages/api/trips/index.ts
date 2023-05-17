import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req})
    switch(req.method) {
        case 'GET': getAllTrips(); break;
        case 'POST': createTrip(req.body, session?.user); break;
    }
}

function getAllTrips() {
    
}

function createTrip(trip: any, user: any){
    console.log(trip, user)
}