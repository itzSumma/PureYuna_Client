import { RegisterForm } from "@/components/auth/register-form";
import { RequireGuest } from "@/components/auth/RequireGuest";

export default function RegisterPage() {
  return (
    <RequireGuest>
      <RegisterForm />
    </RequireGuest>
  );
}