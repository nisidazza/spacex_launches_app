"use client";

import { Box, Center, Link, Stack, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "./form/button";
import Field from "./form/field";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      user_name: e.currentTarget.user_name.value,
      password: e.currentTarget.password.value,
      // @ts-ignore
    }).then(({ error }) => {
      if (error) {
        setLoading(false);
        toast.error(error);
      } else {
        router.refresh();
        router.push("/protected");
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
          placeholder="panic@thedis.co"
          autoComplete="email"
          label="Username"
        />
        <Field id="password" name="password" type="password" label="Password" />
      </Stack>
      <Box pt="30px">
        <Stack spacing={5}>
          <Button loading={loading} label="Sign In" />
          <Center>
            <Text fontSize="md" className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-gray-800">
                Sign up
              </Link>{" "}
              for free.
            </Text>
          </Center>
        </Stack>
      </Box>
    </form>
  );
}
