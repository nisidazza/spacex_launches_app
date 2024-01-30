import {createApolloClient} from "@/app/graphql/client";
import { query } from "@/app/graphql/query";
import { Launch } from "@/app/graphql/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CircularProgress,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import Moment from "moment";
import Image from "next/image";
import NextLink from "next/link";
import { FaYoutube } from "react-icons/fa";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default async function Launches() {
  const client = createApolloClient();
  const { loading, error, data } = await client.query({
    query,
    context: { fetchOptions: { next: { revalidate: 5 } } },
  });

  if (loading) return <CircularProgress isIndeterminate />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{error.name}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  const launches = data.launchesPast as Launch[];

  return (
    <Container maxW={"100%"} centerContent mt="50px" overflowY="auto">
      <Grid
        h="100vh"
        templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}
        gap={5}
      >
        {launches.map((launch) => (
          <GridItem w="100%" key={launch.id}>
            <Card>
              <Box
                height="300px"
                width="inherit"
                overflow="hidden"
                position="relative"
              >
                {launch.links.flickr_images[0] ? (
                  <Image
                    src={launch.links.flickr_images[0]}
                    alt={launch.mission_name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    fill
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                    style={{
                      objectFit: "fill",
                    }}
                  />
                ) : (
                  <Image
                    src="/rocket_station_placeholder.jpeg"
                    alt={launch.mission_name}
                    width={400}
                    height={400}
                    style={{ objectFit: "fill", height: "100%" }}
                    priority={true}
                  />
                )}
              </Box>

              <CardBody bgColor={"white"}>
                <Stack mt="0" spacing="2">
                  <Box display="flex" justifyContent={"space-between"}>
                    <Heading
                      size={launch.mission_name.length > 40 ? "xs" : "sm"}
                      fontWeight="bold"
                    >
                      {launch.mission_name}
                    </Heading>
                  </Box>
                  <Box display="flex" alignItems="baseline">
                    <HStack>
                      <Box fontWeight="bold" color="gray.600">
                        Launch Date:
                      </Box>
                      <Text fontWeight="semibold">
                        {Moment(launch.launch_date_utc).format(
                          "MM/DD/YYYY, h:mm:ss a"
                        )}
                      </Text>
                    </HStack>
                  </Box>
                  <Box display="flex" alignItems="baseline">
                    <HStack>
                      <Box fontWeight="bold" color="gray.600">
                        Rocket:{" "}
                      </Box>
                      <Text fontWeight="semibold">
                        {launch.rocket.rocket_name}
                      </Text>
                    </HStack>
                  </Box>
                  {launch.links.video_link ? (
                    <Link
                      as={NextLink}
                      href={launch.links.video_link}
                      isExternal
                    >
                      <FaYoutube
                        color="red"
                        size={"30px"}
                        title="launch-video"
                      />
                    </Link>
                  ) : (
                    <Link
                      as={NextLink}
                      href={""}
                      style={{ pointerEvents: "none" }}
                    >
                      <FaYoutube
                        color="grey"
                        size="30px"
                        title="youtube-icon"
                      />
                    </Link>
                  )}
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
