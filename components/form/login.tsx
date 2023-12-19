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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../button";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
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
      onSubmit={form.handleSubmit(onSubmit)}
      style={{ backgroundColor: "rgb(249 250 251)", padding: "50px" }}
    >
      <Stack spacing={4}>
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
