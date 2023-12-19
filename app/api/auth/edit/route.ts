import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { username, email, job_title } = await req.json();

    const existingUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 409, statusText: "Username already exists" }
      );
    } else {
      const updatedUser = await db.user.update({
        where: { email: email },
        data: {
          username,
          job_title,
        },
      });
      return NextResponse.json(
        { user: updatedUser, message: "User updated successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
