"use client";

import { useState } from "react";
import { User, ImageIcon, Loader2, Mail, ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuthGuard } from "@/hooks/authGuard";
import { toast } from "sonner";
import Spinner from "@/components/elements/Spinner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, updateUserProfile } = useAuthGuard() as ReturnType<

    typeof useAuthGuard
  > & {
    updateUserProfile: (updates: {
      displayName?: string;
      photoURL?: string;
    }) => Promise<void>;
  };

  const [name, setName] = useState(user?.displayName ?? "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [saving, setSaving] = useState(false);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const initials =
    user.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile({
        displayName: name.trim(),
        photoURL: photoURL.trim() || undefined,
      });
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

 return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>


        <p className="text-muted-foreground">
          Update your name and profile photo
        </p>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={photoURL || undefined} alt={name} />
              <AvatarFallback className="bg-primary/20 text-primary text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user.displayName ?? "User"}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </p>
            </div>
          </div>

          <Separator className="mb-6" />

          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  className="pl-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="photoURL">Photo URL</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="photoURL"
                  className="pl-9"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Paste a link to an image hosted online
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={user.email ?? ""} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <Button type="submit" className="w-full h-11" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}