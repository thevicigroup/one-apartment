import { NextResponse } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { db } from "@/lib/database";
import { userParametersSchema } from "@/lib/validators/search-parameters";
import { NextApiRequest, NextApiResponse } from "next";
import { loadSavedSearchParams } from "@/components/layout/user-profile-tab";
import { User } from "@prisma/client";


// export async function POST(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const user: User = req.body;

//     // This logic assumes that if there's no user in the body, it's unauthorized.
//     if (!user) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     // validate the user with zod schema
//     const validatedUser = userParametersSchema.parse(user);

//     // create the new parameter
//     const parameter = await db.searchParameter.create({
//       data: {
//         nickname: validatedUser.nickname,
//         address: validatedUser.address,
//         traveltime: validatedUser.traveltime,
//         travelmode: validatedUser.travelmode,
//         userId: validatedUser.id,
//       },
//     });

//     return res.status(200).json(parameter);

//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(422).json({ message: JSON.stringify(error.issues) });
//     }

//     console.error(error); // Log the error to the server console
//     return res.status(500).json({ message: error.message || "Internal Server Error" });  
//   }
// }

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user: User = req.body;
    const parameters = await loadSavedSearchParams(user);
    res.status(200).json(parameters);
  } else {
    // 404
    res.status(404).json({ message: "Not found" });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
      return new Response("Unauthorized", { status: 403 });
  }

  try {
      const json = await req.json();
      const body = userParametersSchema.parse(json);

      // create the new parameter
      const parameter = await db.searchParameter.create({
          data: {
              nickname: body.nickname,
              address: body.address,
              traveltime: body.traveltime,
              travelmode: body.travelmode,
              userId: user.id,
          },
      });
      
      return NextResponse.json(parameter);
  } catch (error) {
      console.error(error);  // log the error to get more details

      if (error instanceof z.ZodError) {
          return new Response(JSON.stringify(error.issues), { status: 422 });
      }
      return new Response(null, { status: 500 });
  }
}
