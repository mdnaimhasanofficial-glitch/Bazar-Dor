'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; 

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") 
    const email = formData.get("email") 
    const password = formData.get("password") 

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (data) {
        toast.success('সফলভাবে রেজিস্ট্রেশন সম্পূর্ণ হয়েছে!');
      }

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      toast.error("একটি সমস্যা দেখা দিয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-2">
      <form onSubmit={onSubmit} className="w-full max-w-md">
        <fieldset className="fieldset bg-base-100 border-base-200 shadow-xl rounded-2xl w-full border p-6 md:p-8">
          {/* Header Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-base-content">অ্যাকাউন্ট তৈরি করুন</h2>
            <p className="text-xs text-base-content/60 mt-1">
              নতুন অ্যাকাউন্ট খুলতে নিচের তথ্যগুলো দিন
            </p>
          </div>

          {/* Name Input */}
          <label className="label text-sm font-medium">পূর্ণ নাম</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full focus:input-primary transition-all mb-3"
            placeholder="আপনার নাম"
            required
          />

          {/* Email Input */}
          <label className="label text-sm font-medium">ইমেইল</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full focus:input-primary transition-all mb-3"
            placeholder="example@gmail.com"
            required
          />

          {/* Password Input */}
          <label className="label text-sm font-medium">পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full focus:input-primary transition-all"
            placeholder="••••••••"
            required
          />

          {/* Sign Up Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn py-2 cursor-pointer bg-[#0F8B4D] text-white rounded-2xl w-full mt-6 font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "প্রসেসিং হচ্ছে..." : "রেজিস্ট্রেশন করুন"}
          </button>

          {/* Footer Link to Sign In */}
          <p className="text-center text-xs text-base-content/70 mt-6">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="link link-hover text-xs text-[#0F8B4D] underline ml-3 font-medium"
            >
              লগইন করুন
            </Link> 
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;