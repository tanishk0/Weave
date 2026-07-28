"use client";

import { useState } from "react";
import { AuthInput } from "../components/AuthInput";
import { PasswordInput } from "../components/PasswordInput";
import { SignInBtn } from "../components/SignInBtn";
import { SocialButtons } from "../components/SocialButtons";
import { Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        setError(res.error.message || "Invalid email or password.");
      } else {
        router.push("/app");
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await signIn.social({ provider, callbackURL: "/" });
    } catch (err: any) {
      setError(err?.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Header Text */}
      <h1 className="text-2xl sm:text-[28px] font-semibold text-zinc-900 tracking-tight text-center">
        Sign in to Weave
      </h1>
      <p className="text-sm sm:text-[15px] text-zinc-500 font-normal text-center mt-1.5 mb-8">
        Enter your details to access your account.
      </p>

      {error && (
        <div className="w-full mb-4 p-3 text-xs rounded-xl bg-red-50 border border-red-200/80 text-red-600 text-center font-medium">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <AuthInput
          label="Email address"
          Icon={Mail}
          placeholder="Enter your email address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-1 px-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-600 font-medium select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-zinc-300 text-black focus:ring-black cursor-pointer"
              />
              <span>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-xs text-zinc-600 hover:text-zinc-900 underline font-medium cursor-pointer transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <SignInBtn isLoading={loading} />
      </form>

      {/* Social Logins */}
      <SocialButtons
        onGoogleClick={() => handleSocialSignIn("google")}
        onGithubClick={() => handleSocialSignIn("github")}
        isLoading={loading}
      />
    </div>
  );
};