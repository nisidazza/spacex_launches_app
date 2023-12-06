import Launches from "@/components/launches";
import NavBar from "@/components/navbar";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex flexDirection={"column"} minHeight={"100vh"}>
      <NavBar />
      <Launches />
    </Flex>
  );
}
