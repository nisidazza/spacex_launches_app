import { getClient } from "@/app/graphql/client";
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
  Image,
  Img,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import Moment from "moment";
import NextLink from "next/link";
import { FaYoutube } from "react-icons/fa";

export default async function Launches() {
  const { loading, error, data } = await getClient().query({
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

  var launches = data.launchesPast as Launch[];
  launches = launches.filter(
    (launch) => launch.links.flickr_images.length > 0 && launch.links.video_link
  );

  return (
    <Container maxW={"100%"} centerContent mt="50px">
      <Grid
        h="100vh"
        templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}
        gap={5}
      >
        {launches.map((launch) => (
          <GridItem w="100%" key={launch.id}>
            <Card>
              <Box height={"300px"} overflow="hidden">
                <Image
                  boxSize="100%"
                  src={launch.links.flickr_images[0]}
                  alt={launch.mission_name}
                  objectFit="fill"
                  fallback={
                    <Img
                      boxSize="100%"
                      src={"/rocket_station_placeholder.jpeg"}
                      alt={launch.mission_name}
                      objectFit="fill"
                    />
                  }
                />
              </Box>

              <CardBody bgColor={"white"}>
                <Stack mt="0" spacing="2">
                  <Box display="flex" justifyContent={"space-between"}>
                    <Heading size="md">{launch.mission_name}</Heading>
                    {/* <MdFavorite /> */}
                  </Box>

                  <Box display="flex" alignItems="baseline">
                    <HStack>
                      <Box fontWeight="bold" color="gray.600">
                        Launch Date:
                      </Box>
                      <Text fontWeight="semibold">
                        {Moment(launch.launch_date_utc).format(
                          "MMM Do YYYY, h:mm:ss a"
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
                  <Link as={NextLink} href={launch.links.video_link} isExternal>
                    <FaYoutube color="red" size={"30px"} />
                  </Link>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
