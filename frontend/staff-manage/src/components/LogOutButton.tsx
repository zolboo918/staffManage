"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

function LogOutButton() {
  const { data } = useSession();
  const handlePress = () => {
    signOut({ redirect: true, callbackUrl: "/signin" });
  };
  return data?.user ? (
    <div
      className="absolute right-10 top-10 bg-white p-2 rounded-lg"
      onClick={handlePress}
    >
      <button>Гарах</button>
    </div>
  ) : (
    <></>
  );
}

export default LogOutButton;
