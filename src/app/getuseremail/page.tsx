"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GetUserEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/getuseremail", { email });
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error);
      } else {
        console.log("An unexpected error occurred");
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold text-center">Reset Password</h1>
      <div className="flex flex-col items-center justify-center">
        <label
          htmlFor="email"
          className="text-sm font-bold text-gray-500 text-left w-full"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <Button
          onClick={onReset}
          disabled={buttonDisabled}
          className="p-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-gray-600 mb-4"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </Button>
        {error && (
          <div>
            <h2 className="text-2xl text-red-500 mb-4">Error</h2>
            <Link href="/login" className="text-blue-500 cursor-pointer mb-4">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
