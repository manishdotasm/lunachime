"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function OTPForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  function getCookie(name: string) {
    const cookieArray = document.cookie.split("; ");
    for (let i = 0; i < cookieArray.length; i++) {
      const [key, value] = cookieArray[i].split("=");
      if (key === name) {
        return value;
      }
    }
    return null; // Return null if cookie is not found
  }

  const email = getCookie("email");

  function onClick() {
    setIsLoading(true);

    axios
      .post("/api/auth/register/otp-verification", { email, otp })
      .then(() => router.push("/auth/register/register-details"))
      .catch(() => {
        toast.error("OTP verification failed!");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Card className="mx-auto max-w-sm z-20">
      <CardHeader>
        <CardTitle className="text-2xl">Enter OTP</CardTitle>
        <CardDescription>We have sent a one-time password (OTP) to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex  w-full justify-center mb-3">
          <InputOTP maxLength={6} disabled={isLoading} value={otp} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="w-full flex justify-center mt-5">
          <Button type="submit" className="w-72 font-bold" disabled={isLoading} onClick={onClick}>
            Verify
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm">
          Didn&apos;t receive an OTP?{" "}
          <Link href="/auth/register/register-email" className="underline">
            Retry sending it
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
