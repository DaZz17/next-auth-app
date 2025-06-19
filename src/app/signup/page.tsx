"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-8">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr />
      <div className="flex flex-col items-center justify-center">
        <label htmlFor="username" className="text-left w-full">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        />
        <label htmlFor="email" className="text-left w-full">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        />
        <label htmlFor="password" className="text-left w-full">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        />
        <Button
          onClick={onSignup}
          className="p-2 cursor-pointer border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </Button>
        <div className="flex flex-row items-center justify-center text-sm">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="cursor-pointer underline text-blue-500 ml-2"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
