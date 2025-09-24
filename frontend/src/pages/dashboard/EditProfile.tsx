import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useProfile from "@/hooks/useProfile";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user, updateProfile, loading } = useProfile();
  const navigate = useNavigate();

  // local state form
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [jenjangSekolah, setJenjangSekolah] = useState(user?.jenjang_sekolah || "");
  const [asalSekolah, setAsalSekolah] = useState(user?.asal_sekolah || "");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // ✅ validasi frontend: password & confirm harus sama
    if (password && password !== passwordConfirmation) {
      toast.error("Password confirmation does not match");
      return;
    }

    try {
      await updateProfile(user.id, {
        name,
        email,
        password: password || undefined,
        password_confirmation: password ? passwordConfirmation : undefined,
        jenjang_sekolah: jenjangSekolah,
        asal_sekolah: asalSekolah,
        avatar,
      });

      toast.success("Profile updated successfully");

      // redirect setelah sukses
      navigate(-1);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      // kosongkan password setelah submit
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jenjang_sekolah">Jenjang Sekolah</Label>
              <Input
                id="jenjang_sekolah"
                value={jenjangSekolah}
                onChange={(e) => setJenjangSekolah(e.target.value)}
                placeholder="Masukkan jenjang sekolah"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="asal_sekolah">Asal Sekolah</Label>
              <Input
                id="asal_sekolah"
                value={asalSekolah}
                onChange={(e) => setAsalSekolah(e.target.value)}
                placeholder="Masukkan asal sekolah"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
