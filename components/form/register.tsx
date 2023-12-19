"use client";

import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../button";

type FormValues = {
  email: string;
  password: string;
  username: string;
  job_title: string;
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      job_title: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
        job_title: values.job_title,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.ok) {
        toast.success("Account created! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.statusText);
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{ backgroundColor: "rgb(249 250 251)", padding: "50px" }}
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            placeholder="Username"
            type="text"
            {...form.register("username")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="mail@example.com"
            {...form.register("email")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input id="password" type="password" {...form.register("password")} />
        </FormControl>

        <FormControl>
          <FormLabel>Job Title</FormLabel>
          <Input
            id="job_title"
            type="text"
            placeholder="Frontend Developer"
            {...form.register("job_title")}
          />
        </FormControl>
      </Stack>
      <Box pt="30px">
        <Stack spacing={5}>
          <Button loading={loading} label="Sign Up" />
          <Center>
            <Text fontSize="md" className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-gray-800">
                Sign in
              </Link>{" "}
              instead.
            </Text>
          </Center>
        </Stack>
      </Box>
    </form>
  );
}
