'use client';

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (user?.name) {
        setName(user.name);
    }
  }, [user]);

 
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট করা হয়েছে");
            router.push("/signin");
          },
        },
      });
    } catch (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে একটি সঠিক নাম লিখুন");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      }
    } catch (err) {
      toast.error("একটি অপ্রত্যাশিত সমস্যা ঘটেছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f4]">
        <span className="loading loading-spinner loading-md text-[#0f8b4d]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#f4f6f4] p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header Title */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* 1. User Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={user?.image || undefined}
              name={user?.name || "User"}
              className="w-14 h-14 rounded-xl object-cover bg-gray-100 text-gray-700 font-semibold"
            />
            <div>
              <h2 className="text-base font-bold text-gray-800 leading-tight">
                {user?.name || "ইউজার"}
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {user?.email || "example@gmail.com"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <span>↳</span> সাইন আউট
          </button>
        </div>

        {/* 2. Update Information Form */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f8b4d] focus:bg-white transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#0f8b4d] hover:bg-[#0d7843] text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;