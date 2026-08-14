"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/lib/errors";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { INPUT_UNDERLINE } from "@/constants/design-tokens";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSafeNext(value: string | null): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const next = getSafeNext(searchParams.get("next"));
  const registered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { token, user } = await authService.login({ email, password });
      useAuthStore.getState().setAuth(token, user);
      useToastStore.getState().showToast("Welcome back to PureYuna!", "success");
      router.replace(next);
    } catch (err) {
      const errorMessage =
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        "Invalid email or password.";
      setError(errorMessage);
      useToastStore.getState().showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back to PureYuna"
      subtitle="Sign in to continue your skincare routine."
      imageSrc="https://plus.unsplash.com/premium_photo-1661604366594-64781f82a4b6?auto=format&fit=crop&w=1920&q=90"
      overlayText="Welcome Back. Access your PureYuna sanctuary."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {registered && (
          <Alert className="rounded-md bg-champagne border-golden-border text-deep-brown">
            <CheckCircle2 className="size-4 text-caramel" />
            <AlertTitle className="font-semibold text-sm">Account created</AlertTitle>
            <AlertDescription className="text-xs">
              Your account is ready. Sign in to continue.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="rounded-md bg-red-50 border-red-200 text-red-800">
            <AlertTitle className="font-semibold text-sm">Unable to sign in</AlertTitle>
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-deep-brown text-xs uppercase tracking-wider font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="bg-white border border-golden-border/80 text-deep-brown placeholder:text-deep-brown/45 rounded-xl px-4 py-3 focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel/40 h-auto"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-deep-brown text-xs uppercase tracking-wider font-medium">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-deep-brown/80 hover:text-caramel underline-offset-4 hover:underline text-xs font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-white border border-golden-border/80 text-deep-brown placeholder:text-deep-brown/45 rounded-xl px-4 py-3 focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel/40 h-auto"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-deep-brown/60 hover:text-deep-brown transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-caramel hover:bg-caramel/90 text-white font-medium py-3 rounded-xl shadow-md transition-all h-12 flex items-center justify-center cursor-pointer disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin mr-2" />
          ) : null}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-center text-sm text-deep-brown/90">
          New to PureYuna?{"  "}
          <Link
            href="/register"
            className="font-medium text-deep-brown/90 hover:text-caramel underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}