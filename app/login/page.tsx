import Login from "@/components/form/login";
import { Box, Center, Container, Text } from "@chakra-ui/layout";

export default function SignIn() {
  return (
    <Container
      display="flex"
      flexDirection="column"
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        width="100%"
        overflow="hidden"
        border={"1px lightgray solid"}
        borderRadius="6px"
        boxShadow={
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }
      >
        <Box pb="20px" pt="20px" backgroundColor={"rgb(224, 230, 235)"}>
          <Center>
            <Text fontSize="2xl" as="b">
              Sign In
            </Text>
          </Center>
          <Center>
            <Text fontSize="md" className="text-sm text-gray-500">
              Use your email and password to sign in
            </Text>
          </Center>
        </Box>
        <Login />
      </Box>
    </Container>
  );
}
