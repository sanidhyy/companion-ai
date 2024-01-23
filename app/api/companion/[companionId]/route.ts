import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { companionFormSchema } from "@/schema";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = (await req.json()) as z.infer<
      typeof companionFormSchema
    > | null;
    const user = await currentUser();

    if (!params.companionId)
      return new NextResponse("Companion id is required.", { status: 400 });

    if (!body)
      return new NextResponse("Missing required fields.", { status: 400 });

    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName)
      return new NextResponse("Unauthorized.", { status: 401 });

    if (!src || !name || !description || !instructions || !seed || !categoryId)
      return new NextResponse("Missing required fields.", { status: 400 });

    const isPro = await checkSubscription();

    if (!isPro) new NextResponse("Pro subscription required.", { status: 403 });

    const companion = await db.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
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
    console.error("[COMPANION_PATCH]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { companionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    const companion = await db.companion.delete({
      where: {
        id: params.companionId,
        userId,
      },
    });

    return NextResponse.json(companion, { status: 200 });
  } catch (error: unknown) {
    console.error("[COMPANION_DELETE]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
