import { getClient } from "@/app/graphql/client";
import { query } from "@/app/graphql/query";
import { Launch } from "@/app/graphql/types";
import {
  Box,
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Img,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import NextLink from "next/link";
import { FaYoutube } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

export default async function Launches() {
  const { loading, error, data } = await getClient().query({
    query,
    context: { fetchOptions: { next: { revalidate: 5 } } },
  });

  const launches = data.launchesPast as Launch[];
  console.log(launches);

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
              <Box maxW="sm" height={"300px"} overflow="hidden">
                {/* <Center> */}
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
                {/* </Center> */}
              </Box>

              <CardBody>
                <Stack mt="0" spacing="2">
                  <Box display="flex" justifyContent={"space-between"}>
                    <Heading size="md">{launch.mission_name}</Heading>
                    <MdFavorite />
                  </Box>

                  <Box display="flex" alignItems="baseline">
                    <Box fontWeight="bold" color="gray.600">
                      Launch Date:{" "}
                    </Box>
                    <Text fontWeight="semibold">
                      {format(
                        new Date(launch.launch_date_utc),
                        "dd MMMM yyyy HH:mm"
                      )}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="baseline">
                    <Box fontWeight="bold" color="gray.600">
                      Rocket:{" "}
                    </Box>
                    <Text fontWeight="semibold">
                      {launch.rocket.rocket_name}
                    </Text>
                  </Box>
                  <Link as={NextLink} href={launch.links.video_link} isExternal>
                    <FaYoutube />
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
