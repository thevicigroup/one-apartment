import type { NextApiRequest, NextApiResponse  } from "next";
import prisma



export default async function numberFriendRequests(
    user_id: string,
    req: NextApiRequest, 
    res: NextApiResponse) {
        try{
            // get prisma to fetch the length of the friends requests array on the users profile
            const data = await prisma.user.findUnique({
                where: {
                    id: user_id
                },
                select: {
                    pendingFriendRequests: true
                }
            })
            return res.status(200).json(data)
        }catch(error){
            return res.status(500).json(error)
        }
}