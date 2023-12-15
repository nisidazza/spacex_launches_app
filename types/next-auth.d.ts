import { User as VanillaUser } from "next-auth";

declare module "next-auth" {
  interface User extends VanillaUser {
    username: string;
    job_title: string;
  }
  interface Session {
    user: User;
    token: {
      username: string;
      job_title: string;
    };
  }
}
