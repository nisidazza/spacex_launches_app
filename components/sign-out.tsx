"use client";
import { MenuItem } from "@chakra-ui/menu";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

export default function SignOut() {
  return (
    <MenuItem icon={<IoLogOutOutline size="20px" />} onClick={() => signOut()}>
      Sign out
    </MenuItem>
  );
}
