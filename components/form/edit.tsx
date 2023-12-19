"use client";

import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../button";

type FormValues = {
  username?: string;
  job_title?: string;
};

export default function Edit() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

  const form = useForm({
    defaultValues: {
      username: session?.user.username,
      job_title: session?.user.job_title,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    await fetch("/api/auth/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user.email,
        username: values.username,
        job_title: values.job_title,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.ok) {
        update({
          user: { username: values.username, job_title: values.job_title },
        });
        toast.success("Profile successfully updated!");
        setTimeout(() => {
          router.push("/protected");
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
          <FormLabel>Job Title</FormLabel>
          <Input
            id="job_title"
            type="text"
            placeholder="Frontend Developer"
            {...form.register("job_title")}
          />
        </FormControl>
      </Stack>
      <Box
        pt="30px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
      >
        <Button loading={loading} label="Update" />
      </Box>
    </form>
  );
}
