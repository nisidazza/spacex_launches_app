export type Launch = {
  details: string;
  id: string;
  is_tentative: boolean;
  launch_date_local: Date;
  launch_date_unix: Date;
  launch_date_utc: Date;
  launch_site: LaunchSite;
  launch_success: boolean;
  launch_year: string;
  links: LaunchLinks;
  mission_id: [string];
  mission_name: string;
  rocket: LaunchRocket;
  static_fire_date_unix: Date;
  static_fire_date_utc: Date;
  telemetry: LaunchTelemetry;
  tentative_max_precision: string;
  upcoming: boolean;
};

type LaunchSite = {
  site_id: string;
  site_name: string;
  site_name_long: string;
};

type LaunchTelemetry = {
  flight_club: string;
};

type LaunchLinks = {
  article_link: string;
  flickr_images: [string];
  mission_patch: string;
  mission_patch_small: string;
  presskit: string;
  reddit_campaign: string;
  reddit_launch: string;
  reddit_media: string;
  reddit_recovery: string;
  video_link: string;
  wikipedia: string;
};

type LaunchRocket = {
  rocket: Rocket;
  rocket_name: string;
  rocket_type: string;
};

type Rocket = {
  active: Boolean;
  boosters: number;
  company: string;
  cost_per_launch: number;
  country: string;
  description: string;
  diameter: Distance;
  first_flight: Date;
  height: Distance;
  id: string;
  mass: Mass;
  name: string;
  stages: number;
  success_rate_pct: number;
  type: string;
  wikipedia: string;
};

type Distance = {
  feet: number;
  meters: number;
};

type Mass = {
  kg: number;
  lb: number;
};
