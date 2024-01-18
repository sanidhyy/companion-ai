import { currentUser } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { companionFormSchema } from "@/schema";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as z.infer<
      typeof companionFormSchema
    > | null;
    const user = await currentUser();

    if (!body)
      return new NextResponse("Missing required fields.", { status: 400 });

    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName)
      return new NextResponse("Unauthorized.", { status: 401 });

    if (!src || !name || !description || !instructions || !seed || !categoryId)
      return new NextResponse("Missing required fields.", { status: 400 });

    // TODO: Check for subscription

    const companion = await db.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion, { status: 200 });
  } catch (error: unknown) {
    console.error("[COMPANION_POST]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
