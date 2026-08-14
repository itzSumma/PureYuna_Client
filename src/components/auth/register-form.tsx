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
import { INPUT_UNDERLINE } from "@/constants/design-tokens";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      title="Create your PureYuna account"
      subtitle="Join a brand that starts with your skin — never a role."
      imageSrc="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
      overlayText="Join Us. Embrace conscious luxury and pure, effective care."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && (
          <Alert variant="destructive" className="rounded-md bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="size-4 text-red-800" />
            <AlertTitle className="font-semibold text-sm">Unable to sign up</AlertTitle>
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-deep-brown text-xs uppercase tracking-wider font-medium">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="bg-white border border-golden-border/80 text-deep-brown placeholder:text-deep-brown/45 rounded-xl px-4 py-3 focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel/40 h-auto"
          />
        </div>

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
          <Label htmlFor="password" className="text-deep-brown text-xs uppercase tracking-wider font-medium">
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

        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="text-deep-brown text-xs uppercase tracking-wider font-medium"
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
            className="bg-white border border-golden-border/80 text-deep-brown placeholder:text-deep-brown/45 rounded-xl px-4 py-3 focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel/40 h-auto"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-caramel hover:bg-caramel/90 text-white font-medium py-3 rounded-xl shadow-md transition-all h-12 flex items-center justify-center cursor-pointer disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-sm text-deep-brown/90">
          Already have an account?{"  "}
          <Link href="/login" className="font-medium text-deep-brown/90 hover:text-caramel underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}