import { Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div>
      {session && (
        <Text color={"white"} fontWeight={"bold"} display={"initial"}>
          Welcome {session.user?.name || null}!
        </Text>
      )}
    </div>
  );
}
