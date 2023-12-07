import { Flex } from "@chakra-ui/react";
import AuthStatus from "./auth-status";
import SignOut from "./sign-out";

export default function NavBar() {
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
      {/* @ts-expect-error Server Component */}
      <AuthStatus />
      <SignOut />
    </Flex>
  );
}

//#0d0d0d,#000066, #800080, #cc4400
