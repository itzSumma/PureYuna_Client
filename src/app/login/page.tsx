import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { RequireGuest } from "@/components/auth/RequireGuest";

export default function LoginPage() {
  return (
    <RequireGuest>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </RequireGuest>
  );
}