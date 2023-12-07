import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_name, password, job_title } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      user_name,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        user_name,
        password: await hash(password, 10),
        job_title,
      },
    });
    return NextResponse.json(user);
  }
}
