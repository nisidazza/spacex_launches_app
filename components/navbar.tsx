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
      p={8}
      color={["white", "white", "primary.700", "primary.700"]}
      bg={
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.9822522759103641) 35%, rgba(55,159,210,0.9822522759103641) 52%)"
      }
    >
      <AuthStatus />
      <SignOut />
    </Flex>
  );
}
