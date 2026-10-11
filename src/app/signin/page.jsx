'use client'
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";

const SignInPage = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries())

   
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message)
        
      }

      if (data) {
        toast.success("Sign In successfully!")
      }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-md bg-base-100 border border-base-200 shadow-xl rounded-2xl p-6 md:p-8">
        {/* Header Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-base-content">স্বাগতম!</h2>
          <p className="text-xs text-base-content/60 mt-1">
            আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন
          </p>
        </div>

       

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="label text-xs font-semibold text-base-content/80 mb-1 block">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              required
              className="input input-bordered w-full focus:input-primary text-sm transition-all rounded-xl"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="label text-xs font-semibold text-base-content/80 block">
                পাসওয়ার্ড
              </label>
              <a
                href="#forgot"
                className="link link-hover text-xs text-[#0F8B4D] font-medium"
              >
                ভুলে গেছেন?
              </a>
            </div>
            <input
              name="password"
              type="password"
              required
              className="input input-bordered w-full focus:input-primary text-sm transition-all rounded-xl"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            
            className="btn text-white py-2 bg-[#0F8B4D] hover:bg-[#0d7843] active:scale-[0.98] w-full mt-6 font-semibold shadow-md rounded-xl transition-all border-none"
          >
             <span className="loading  loading-spinner loading-sm">লগইন করুন</span> 
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-base-content/70 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="link link-hover text-[#0F8B4D] ml-1 text-xs font-semibold"
          >
            রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;