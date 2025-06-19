"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onReset = async () => {
    try {
      if (password !== confirmPassword) {
        setError(true);
        console.log("Passwords do not match");
        return;
      }
      if (!token) {
        setError(true);
        console.log("No token found");
        return;
      }
      setLoading(true);
      if (!password || !confirmPassword) {
        console.log("No password or confirm password found");
        setError(true);
        return;
      }
      if (password.length < 6) {
        console.log("Password must be at least 6 characters long");
        setError(true);
        return;
      }
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      console.log(response.data);
      setSuccess(true);
      setError(false);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      onReset();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
      <div className="flex flex-col items-center justify-center">
        <label
          htmlFor="password"
          className="mb-2 text-sm font-bold text-gray-500 text-left w-full"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <label
          htmlFor="confirmPassword"
          className="mb-2 text-sm font-bold text-gray-500 text-left w-full"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <Button
          onClick={onReset}
          disabled={loading}
          className="p-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-gray-600 mb-4"
        >
          Update Password
        </Button>
        {success && (
          <div>
            <h2 className="text-2xl mb-4">Password Updated Successfully</h2>
            <Link href="/login" className="text-blue-500 cursor-pointer mb-4">
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl text-red-500 mb-4">Error</h2>
            <Link href="/login" className="text-blue-500 cursor-pointer mb-4">
              Login
            </Link>
          </div>
        )}
        {loading && (
          <div>
            <h2 className="text-2xl text-blue-500 mb-4">Loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
