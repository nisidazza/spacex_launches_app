"use client";

import { Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user && (
        <Text
          color={"white"}
          fontWeight={"bold"}
          display={"initial"}
          fontSize="xl"
        >
          Welcome {session.user?.username}, {session.user.job_title}!
        </Text>
      )}
    </div>
  );
}
