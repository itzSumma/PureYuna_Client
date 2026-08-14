"use client";

import * as React from "react";
import { User, Mail, Award, Calendar, Loader2, Save, Camera, Image as ImageIcon } from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/errors";

function ProfileContent() {
  const showToast = useToastStore((state) => state.showToast);
  const { user, setUser } = useAuthStore();

  const [name, setName] = React.useState(user?.name || "");
  const [email, setEmail] = React.useState(user?.email || "");
  const [avatarUrl, setAvatarUrl] = React.useState(user?.image || "");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(user?.image || null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Synchronize state when user details load
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarUrl(user.image || "");
      setPreviewUrl(user.image || null);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        setAvatarUrl(""); // Clear text input for clean UX since base64 is huge
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setAvatarUrl(url);
    setPreviewUrl(url || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast("Fields cannot be empty.", "error");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const updatedUser = await authService.updateProfile({ name, email });
      // Map back database User type to AuthUser type if role is needed
      const mergedUser = {
        ...user,
        ...updatedUser,
        image: previewUrl || undefined,
      };
      setUser(mergedUser);
      showToast("Profile updated successfully!", "success");
    } catch (err) {
      const errMsg = getApiErrorMessage(err);
      setErrorMessage(errMsg);
      showToast(errMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  const joinDate = (user as any).createdAt
    ? new Date((user as any).createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "August 2026";

  return (
    <div className="relative min-h-screen py-10 text-[#3A2820]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3.5xl font-medium tracking-tight text-cocoa mb-1">
          Sanctuary Settings
        </h1>
        <p className="text-sm text-cocoa/60 mb-10">
          Manage your personal profile and account credentials.
        </p>

        <div className="grid gap-8 md:grid-cols-[35fr_65fr] items-start">
          {/* User Detail Summary Card */}
          <div className="rounded-3xl border border-taupe/40 bg-cream p-6 text-center space-y-5 shadow-xs">
            <div className="relative mx-auto size-24">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={name}
                  className="size-full rounded-full object-cover shadow-md border-4 border-white"
                />
              ) : (
                <div className="size-full rounded-full bg-gradient-to-br from-terracotta to-ochre text-brand-cream grid place-items-center font-heading text-4xl shadow-md border-4 border-white">
                  {name[0]?.toUpperCase() || "U"}
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-[#4A1E27] text-[#FAF5F0] rounded-full p-1.5 cursor-pointer hover:bg-[#3D1B22] transition-colors shadow-md border border-white"
                title="Upload Profile Image"
              >
                <Camera className="size-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="space-y-1">
              <h2 className="font-heading text-xl font-medium text-cocoa">{name}</h2>
              <span className="text-[0.62rem] font-bold tracking-widest text-terracotta uppercase px-2.5 py-0.5 rounded-full bg-terracotta/10 border border-terracotta/20">
                {user.role} Member
              </span>
            </div>

            <div className="border-t border-taupe/20 pt-4 text-left space-y-3 text-xs text-cocoa/70">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-terracotta/60 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="size-4 text-terracotta/60 shrink-0" />
                <span>PureYuna Loyalty Tier: Gold</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-terracotta/60 shrink-0" />
                <span>Member since {joinDate}</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="rounded-3xl border border-taupe/40 bg-cream p-8 space-y-6 shadow-xs">
            <h3 className="font-heading text-xl font-medium text-cocoa pb-3 border-b border-taupe/20">
              Personal Information
            </h3>

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-[0.68rem] font-bold tracking-widest text-muted-foreground uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-cocoa/40">
                    <User className="size-4" />
                  </span>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full text-sm pl-10 pr-4 py-3.5 rounded-xl border border-[#3A2820]/15 bg-white/50 focus:border-terracotta focus:ring-0 outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[0.68rem] font-bold tracking-widest text-muted-foreground uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-cocoa/40">
                    <Mail className="size-4" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-sm pl-10 pr-4 py-3.5 rounded-xl border border-[#3A2820]/15 bg-white/50 focus:border-terracotta focus:ring-0 outline-none"
                  />
                </div>
              </div>

              {/* Avatar / Image URL */}
              <div className="space-y-1.5">
                <label htmlFor="avatarUrl" className="text-[0.68rem] font-bold tracking-widest text-muted-foreground uppercase">
                  Avatar / Image URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-cocoa/40">
                    <ImageIcon className="size-4" />
                  </span>
                  <input
                    id="avatarUrl"
                    type="text"
                    placeholder="https://example.com/avatar.jpg"
                    value={avatarUrl}
                    onChange={handleUrlChange}
                    className="w-full text-sm pl-10 pr-4 py-3.5 rounded-xl border border-[#3A2820]/15 bg-white/50 focus:border-terracotta focus:ring-0 outline-none"
                  />
                </div>
                <p className="text-[10px] text-cocoa/50 mt-1">
                  Paste an image URL above or select a local image file by clicking the camera icon on your avatar.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-12 px-8 text-sm font-semibold cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save className="size-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  );
}
