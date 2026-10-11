'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries())

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign in error:", error);
        setErrorMessage(error.message || "লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }

      if (data) {
        console.log("Logged in successfully:");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
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

        {/* Error Alert */}
        {errorMessage && (
          <div className="alert alert-error text-xs p-3 mb-4 rounded-xl">
            <span>{errorMessage}</span>
          </div>
        )}

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
            disabled={loading}
            className="btn text-white bg-[#0F8B4D] hover:bg-[#0d7843] active:scale-[0.98] w-full mt-6 font-semibold shadow-md rounded-xl transition-all border-none"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "লগইন করুন"}
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