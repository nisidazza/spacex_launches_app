import Launches from "@/components/launches";
import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Home() {
  return (
    <Flex
      flexDirection={"column"}
      minHeight={"100vh"}
      alignItems="center"
      justifyContent="center"
    >
      <Suspense
        fallback={<p className="text-white font-bold text-2xl">Loading...</p>}
      >
        <Launches />
      </Suspense>
    </Flex>
  );
}
