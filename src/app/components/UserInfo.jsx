"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
    console.log(user)
  const handleSignOut = async ()=>{
    await authClient.signOut();
  }

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <Avatar className="rounded-full ring-2 ring-[#0f8b4d]/20">
            <Avatar
              alt={user.name || "User Avatar"}
              src={user.name}
              className="object-cover"
            />
            <Avatar.Fallback className="rounded-full bg-emerald-50 text-[#0f8b4d] font-semibold text-xs">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar.Fallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-gray-800 leading-tight">
              {user.name}
            </span>
            <span className="text-[11px] text-gray-400 font-medium truncate max-w-35">
              {user.email}
            </span>
          </div>
          <button onClick={handleSignOut} className="btn">Sign Out</button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href={`/signin`}>
            <button className="text-xs sm:text-sm px-3.5 py-2 cursor-pointer font-semibold text-gray-600 hover:text-[#0f8b4d] transition-colors">
              সাইন ইন
            </button>
          </Link>
          <Link href={`/signup`}>
            <button className="bg-[#0f8b4d] cursor-pointer text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/20 hover:bg-[#0d7541] hover:shadow-md hover:shadow-emerald-600/30 active:scale-95 transition-all">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;