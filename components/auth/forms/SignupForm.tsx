"use client";

import { useState } from "react";
import { AuthInput } from "../components/AuthInput";
import { PasswordInput } from "../components/PasswordInput";
import { CreateAccountBtn } from "../components/CreateAccountBtn";
import { SocialButtons } from "../components/SocialButtons";
import { User, Mail } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signUp.email({
        email,
        password,
        name,
      });

      if (res?.error) {
        setError(res.error.message || "Failed to create account.");
      } else {
        router.push("/");
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
        Create your account
      </h1>
      <p className="text-sm sm:text-[15px] text-zinc-500 font-normal text-center mt-1.5 mb-8">
        Fill in the details below to get started.
      </p>

      {error && (
        <div className="w-full mb-4 p-3 text-xs rounded-sm bg-red-50 border border-red-200/80 text-red-600 text-center font-semibold">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <AuthInput
          label="Full name"
          Icon={User}
          placeholder="Enter your full name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <PasswordInput
          label="Password"
          placeholder="Create a strong password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <CreateAccountBtn isLoading={loading} />
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