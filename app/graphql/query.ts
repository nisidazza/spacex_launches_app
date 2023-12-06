import { gql } from "@apollo/client";

export const query = gql`
  query GetLaunches {
    launchesPast {
      id
      mission_name
      details
      launch_date_utc
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        mission_patch
        flickr_images
      }
      rocket {
        rocket {
          country
          description
        }
        rocket_name
        rocket_type
      }
    }
  }
`;
