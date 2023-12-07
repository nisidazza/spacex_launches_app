import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { user_name, password, job_title } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      user_name,
    },
  });
  if (!exists) {
    return NextResponse.json(
      { error: "User does not exist!" },
      { status: 400 }
    );
  } else {
    const user = await prisma.user.update({
      where: {
        user_name,
      },
      data: {
        password: await hash(password, 10),
        job_title,
      },
    });
    return NextResponse.json(user);
  }
}
