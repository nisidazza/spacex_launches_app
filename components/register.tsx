"use client";

import { Box, Center, Link, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "./button";
import Field from "./field";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: e.currentTarget.user_name.value,
        password: e.currentTarget.password.value,
        job_title: e.currentTarget.job_title.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success("Account created! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ backgroundColor: "rgb(249 250 251)", padding: "50px" }}
    >
      <Stack spacing={4}>
        <Field
          id="user_name"
          name="user_name"
          type="email"
          label="Username"
          placeholder="panic@thedis.co"
          autoComplete="email"
        />
        <Field id="password" name="password" type="password" label="Password" />
        <Field
          id="job_title"
          name="job_title"
          type="text"
          placeholder="Frontend Developer"
          label="Job Title"
        />
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
