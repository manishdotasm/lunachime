"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

// Define Zod validation schema
const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .refine((email) => email.includes(".edu"), {
      message: "Please use your student email.",
    }),
});

type emailFormValues = z.infer<typeof emailSchema>;

export function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<emailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = (data: emailFormValues) => {
    console.log(data.email);
    setIsLoading(true);

    axios
      .post("/api/auth/register/otp-mail", data)
      .then(() => {
        const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
        document.cookie = `email=${
          data.email
        }; expires=${expirationTime.toUTCString()}; path=/; secure; SameSite=Strict`;
        router.push("/auth/register/otp-verification");
      })
      .catch(() => toast.error("Couldn't send the OTP!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Card className="mx-auto max-w-sm z-20">
      <CardHeader>
        <CardTitle className="text-2xl">Verify your email.</CardTitle>
        <CardDescription>Enter your student email below and we&apos;ll send you an OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@university.edu.com"
                {...register("email")}
                required
                aria-invalid={errors.email ? "true" : "false"}
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              Verify
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in!
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
