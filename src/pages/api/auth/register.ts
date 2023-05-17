import {NextApiRequest, NextApiResponse} from "next";
import {hash} from "bcrypt";
import { Role } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export default async function handleRequest (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        
        const {username, email, password, terms} = req.body
        
        if(terms) {
            const passwordHashed = await hash(password, 10);

            try {
                const newUser = await prisma.user.create({
                    // @ts-ignore
                    data: {
                        name: username,
                        email: email,
                        password: passwordHashed,
                        role: Role.USER,
                        emailVerified: true,
                    }
                })
                return res.status(200).json({status: "success", user: newUser})
            }
            catch (e) {
                console.log(e)
                return res.status(500).json({status: "error", message: e})
            }
        }
        else {
            return res.status(500).json({error: "Les conditions d'utilisation n'ont pas été acceptées"})
        }
    }
    
    return res.status(500).json({error: "We only accept POST method"})
}
