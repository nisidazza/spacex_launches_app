import { authOptions } from "@/lib/auth";
import { Flex } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import AuthStatus from "./auth-status";
import Profile from "./profile";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={6}
      bg={"rgba(0, 0, 0, 0.5)"}
    >
      <Link href="/">
        <FaHome color="white" fontSize="30px" />
      </Link>
      <AuthStatus />
      {session?.user ? <Profile /> : <span />}
    </Flex>
  );
}
