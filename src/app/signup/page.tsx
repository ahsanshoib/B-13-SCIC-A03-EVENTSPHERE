"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Mail, Lock, User, Loader2,ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await signup(name, email, password);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? mapFirebaseError(err.message)
          : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Account created successfully!");
      router.push("/");
    } catch {
      toast.error("Google sign-up failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 gradient-hero relative">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 left-4 sm:top-6 sm:left-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">

        <CardContent className="pt-8 pb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <CalendarDays className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl">EventSphere</span>
          </div>

          <h1 className="text-2xl font-bold text-center mb-1">Create Account</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Sign up to start adding and managing events
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-9 h-11"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9 h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 h-11"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>

          <Button
            variant="outline"
            className="w-full h-11 mt-3"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            type="button"
          >
            {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue with Google"}
          </Button>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function mapFirebaseError(message: string): string {
  if (message.includes("auth/email-already-in-use")) {
    return "An account with this email already exists.";
  }
  if (message.includes("auth/weak-password")) {
    return "Password is too weak. Use at least 6 characters.";
  }
  if (message.includes("auth/invalid-email")) {
    return "Please enter a valid email address.";
  }
  return "Signup failed. Please try again.";
}