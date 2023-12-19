"use client";

import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuList } from "@chakra-ui/menu";
import { MenuDivider } from "@chakra-ui/react";

import { CgProfile } from "react-icons/cg";

import { EditProfile } from "./edit-profile";
import SignOut from "./sign-out";

export default function Profile() {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        arial-aria-label="user-profile"
        icon={<CgProfile color="white" size="40px" title="profile-icon" />}
        backgroundColor="transparent"
        _hover={{
          background: "transparent",
        }}
        _active={{ background: "transparent" }}
      />
      <MenuList>
        <EditProfile />
        <MenuDivider />
        <SignOut />
      </MenuList>
    </Menu>
  );
}
