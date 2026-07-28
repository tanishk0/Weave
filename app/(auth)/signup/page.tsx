"use client";

import AuthLayout from "@/components/auth/layout/AuthLayout";
import { SignUpForm } from "@/components/auth/forms/SignupForm";
import { AuthCard } from "@/components/auth/components/AuthCard";
import { TermsText } from "@/components/auth/components/TermsText";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        <AuthCard>
          <SignUpForm />
        </AuthCard>
        <TermsText />
      </div>
    </AuthLayout>
  );
}