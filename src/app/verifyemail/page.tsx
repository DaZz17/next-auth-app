"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold text-center mb-4">Verify Email</h1>
      <div className="flex flex-col items-center justify-center">
        {verified && (
          <div>
            <h2 className="text-2xl mb-4">Email verified successfully</h2>
            <Link href="/login" className="text-blue-500 cursor-pointer mb-4">
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl text-red-500 mb-4">Error</h2>
            <Link href="/signup" className="text-blue-500 cursor-pointer mb-4">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
