"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>
      <hr />
      <h2 className="text-2xl font-bold mb-8 rounded-md p-2 bg-gray-500 text-white mb-4">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <Button
        onClick={getUserDetails}
        className="mt-4 cursor-pointer bg-green-500 text-white p-2 rounded-md mb-4 focus:outline-none focus:border-gray-600"
      >
        Get User Details
      </Button>
      <Button
        onClick={logout}
        className="mt-4 cursor-pointer bg-blue-500 text-white p-2 rounded-md mb-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </Button>
    </div>
  );
}
