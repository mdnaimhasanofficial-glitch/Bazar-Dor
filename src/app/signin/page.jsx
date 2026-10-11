'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "লগইন ব্যর্থ হয়েছে।");
      }

      if (data) {
        toast.success("সফলভাবে লগইন করা হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      toast.error("একটি অপ্রত্যাশিত সমস্যা ঘটেছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    console.log(data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-md bg-base-100 border border-base-200 shadow-xl rounded-2xl p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-base-content">স্বাগতম!</h2>
          <p className="text-xs text-base-content/60 mt-1">আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-xs font-semibold text-base-content/80 mb-1 block">ইমেইল</label>
            <input
              name="email"
              type="email"
              required
              className="input input-bordered w-full focus:input-primary text-sm transition-all rounded-xl"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold text-base-content/80 block mb-1">পাসওয়ার্ড</label>
            <input
              name="password"
              type="password"
              required
              className="input input-bordered w-full focus:input-primary text-sm transition-all rounded-xl"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn text-white py-2 bg-[#0F8B4D] hover:bg-[#0d7843] w-full mt-2 font-semibold shadow-md rounded-xl border-none cursor-pointer disabled:opacity-50"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "লগইন করুন"}
          </button>
        </form>

        <div className="divider text-xs text-base-content/50 my-4">অথবা</div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleSocialLogin} className="btn btn-outline btn-sm rounded-xl">
            Google
          </button>
          <button onClick={ handleSocialLogin} className="btn btn-outline btn-sm rounded-xl">
            GitHub
          </button>
        </div>

        <p className="text-center text-xs text-base-content/70 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="link link-hover text-[#0F8B4D] ml-1 font-semibold">
            রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}