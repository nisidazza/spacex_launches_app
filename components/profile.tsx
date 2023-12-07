import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuList } from "@chakra-ui/menu";
import { CgProfile } from "react-icons/cg";
import SignOut from "./sign-out";

export default async function Profile() {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        arial-aria-label="user-profile"
        icon={<CgProfile color="white" size="40px" title="profile-icon" />}
        _hover={{
          background: "transparent",
        }}
        _active={{ background: "transparent" }}
      />
      <MenuList>
        {/* <MenuItem icon={<FaUserEdit size="20px" title="edit-profile" />}>
          Edit profile
        </MenuItem> */}
        <SignOut />
      </MenuList>
    </Menu>
  );
}
