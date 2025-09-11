import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [agree, setAgree] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi tidak sama");
      return;
    }
    if (!agree) {
      alert("Harus menyetujui syarat dan ketentuan");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Mendaftarkan akun ${name} dengan email ${email}`);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
            <CardDescription>Daftarkan akun kamu untuk mulai menggunakan aplikasi.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Nama kamu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="nama@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
                <Input
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  type="password"
                  className="mt-2"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="agree"
                  checked={agree}
                  onCheckedChange={(val) => setAgree(Boolean(val))}
                />
                <Label htmlFor="agree" className="cursor-pointer">
                  Saya setuju dengan <a href="#" className="underline">syarat & ketentuan</a>
                </Label>
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                    </>
                  ) : (
                    "Daftar"
                  )}
                </Button>
              </div>
            </form>

            <div className="my-4">
              <Separator />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-sm">Sudah punya akun? <NavLink to="/login" className="font-medium hover:underline">Masuk</NavLink></p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
