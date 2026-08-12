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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputUnderline =
  "h-10 rounded-none border-x-0 border-t-0 border-b border-taupe bg-transparent px-0 focus-visible:ring-0 focus-visible:border-organic-primary transition-colors";

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
      router.replace(next);
    } catch (err) {
      setError(getApiErrorMessage(err, "Invalid email or password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back to PureYuna."
      subtitle="Sign in to continue your skincare routine."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {registered && (
          <Alert className="rounded-md">
            <CheckCircle2 className="size-4 text-organic-primary" />
            <AlertTitle>Account created</AlertTitle>
            <AlertDescription>
              Your account is ready. Sign in to continue.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="rounded-md">
            <AlertTitle>Unable to sign in</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-medium tracking-wide text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputUnderline}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-medium tracking-wide text-muted-foreground">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputUnderline}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-0 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin mr-2" />
          ) : null}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New to PureYuna?{" "}
          <Link
            href="/register"
            className="font-medium text-organic-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}