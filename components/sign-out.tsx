"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className=" hover:text-stone-200 transition-all font-bold"
      style={{ color: "white" }}
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
