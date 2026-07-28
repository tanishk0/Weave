"use client";

import AuthLayout from "@/components/auth/layout/AuthLayout";
import { LoginForm } from "@/components/auth/forms/LoginForm";
import { AuthCard } from "@/components/auth/components/AuthCard";
import { LogoutButton } from "@/components/auth/components/LogoutBtn";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        <AuthCard>
          <LoginForm />
        </AuthCard>
      </div>
    </AuthLayout>
  );
}