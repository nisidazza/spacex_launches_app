import { db } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password, job_title } = await req.json();

    const existingEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingEmail)
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409, statusText: "User with this email already exists" }
      );

    const existingUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUsername)
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 409, statusText: "Username already exists" }
      );

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        job_title,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
