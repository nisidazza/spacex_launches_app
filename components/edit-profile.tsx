"use client";

import { MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaUserEdit } from "react-icons/fa";

export const EditProfile = () => {
  const router = useRouter();

  return (
    <>
      <MenuItem
        icon={<FaUserEdit size="20px" title="edit-profile" />}
        onClick={() => router.push("/edit")}
      >
        Edit profile
      </MenuItem>
    </>
  );
};
