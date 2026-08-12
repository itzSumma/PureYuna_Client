"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRegisterErrorMessage } from "@/lib/errors";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputUnderline =
  "h-10 rounded-none border-x-0 border-t-0 border-b border-taupe bg-transparent px-0 focus-visible:ring-0 focus-visible:border-organic-primary transition-colors";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.register({ name: name.trim(), email, password });

      try {
        const { token, user } = await authService.login({ email, password });
        useAuthStore.getState().setAuth(token, user);
        router.replace("/");
      } catch {
        router.replace("/login?registered=1");
      }
    } catch (err) {
      setError(getRegisterErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create your PureYuna account."
      subtitle="Join a brand that starts with your skin — never a role."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && (
          <Alert variant="destructive" className="rounded-md">
            <AlertCircle className="size-4" />
            <AlertTitle>Unable to sign up</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-medium tracking-wide text-muted-foreground">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputUnderline}
          />
        </div>

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
              autoComplete="new-password"
              placeholder="At least 6 characters"
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

        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="text-xs font-medium tracking-wide text-muted-foreground"
          >
            Confirm password
          </Label>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={inputUnderline}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-organic-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}