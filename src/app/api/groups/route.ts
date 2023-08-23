import { NextResponse } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { db } from "@/lib/database";
import { userGroupsSchema } from "@/lib/validators/search-groups";
import { NextApiRequest, NextApiResponse } from "next";
import { loadUserGroups } from "@/components/layout/user-profile-tab";
import { User } from "@prisma/client";

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user: User = req.body;
    const groups = await loadUserGroups(user);
    res.status(200).json(groups);
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
      const body = userGroupsSchema.parse(json);

      // create the new parameter
      const parameter = await db.searchParameter.create({
          data: {
              nickname: body.nickname,
              members: body.members
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

// import { NextRequest, NextResponse } from 'next/server';
// import * as z from 'zod';

// import { getCurrentUser } from '@/lib/auth/get-server-session';
// import { db } from '@/lib/database';
// import { userParametersSchema } from '@/lib/validators/search-parameters';
// import { loadSavedSearchParams } from '@/components/search-functions';
// import { User } from '@prisma/client';

// export async function POST(req: NextRequest) {
//     // const user = await getCurrentUser();
//     // if (!user) {
//     //     return new Response(null, { status: 403 });
//     // }

//     // const json = await req.json();
//     // const body = userParametersSchema.parse(json);

//     // const parameter = await db.searchParameter.create({
//     //     data: {
//     //         nickname: body.nickname,
//     //         address: body.address,
//     //         traveltime: body.traveltime,
//     //         travelmode: body.travelmode,
//     //         userId: user.id,
//     //     },
//     // });

//     // return NextResponse.json(parameter);
//     return new Response('Testing Complete')
// }
