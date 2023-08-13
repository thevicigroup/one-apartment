"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { userParametersSchema } from "@/lib/validators/search-parameters";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/database";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useApartmentContext } from "@/components/providers";
import { Prisma, User } from "@prisma/client";



// export default async function handler(req: Request, res: Response) {
//     if (req.method === 'POST') {
//       const { userId, friendId } = req.body;
  
//       try {
//         const user: User | null = await Prisma.user.findUnique({
//           where: { id: userId },
//         });
  
//         const friend: User | null = await Prisma.user.findUnique({
//           where: { id: friendId },
//         });
  
//         if (!user || !friend) {
//           return res.status(404).json({ message: 'User not found' });
//         }
//         await Prisma.user.update({
//           where: { id: userId },
//           data: {
//             friends: {
//               connect: { id: friendId },
//             },
//           },
//         });
  
//         res.status(200).json({ message: 'Friend added successfully' });
//       } catch (error) {
//         console.error('Error adding friend:', error);
//         res.status(500).json({ message: 'Internal server error' });
//       }
//     } else {
//       res.status(405).json({ message: 'Method not allowed' });
//     }
// }







export const FindFriends = () => {
  // ! Change to friends
    // prettier-ignore
  const form = useForm<z.infer<typeof userParametersSchema>>({
    resolver: zodResolver(userParametersSchema),
    defaultValues: {
        id: uuid(), address: "", nickname: "", traveltime: "30", travelmode: "walking", maxPrice: 0,
    },
  });
  const router = useRouter();
  const { addParameter } = useApartmentContext();
  interface Props {
      user: User;
  }
  return (
      <Form {...form}>
          <div className="grid grid-cols-2 py-4">
              <FormField
                  control={form.control}
                  name="findfriends"
                  render={({ field }) => (
                      <FormItem className="pr-2">
                          <Input placeholder="Enter a Friends Name" type="text" {...field} />
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <Button className="w-1/2" variant="secondary" type="submit">
                  Find Friend
              </Button>
          </div>
      </Form>
  );
};
