"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-8">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
      <div className="flex flex-col items-center justify-center">
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
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        />
        <Link
          href="/getuseremail"
          className="text-sm text-blue-500 text-right w-full mb-4"
        >
          Forgot Password?
        </Link>
        <Button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </Button>
        <div className="flex flex-row items-center justify-center text-sm">
          <span>Don't have an account?</span>
          <Link
            href="/signup"
            className="cursor-pointer underline text-blue-500 ml-2"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
