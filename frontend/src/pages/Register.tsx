import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useRegister from "@/hooks/useRegister";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [jenjangSekolah, setJenjangSekolah] = React.useState("");
  const [asalSekolah, setAsalSekolah] = React.useState("");
  const [agree, setAgree] = React.useState(false);

  const { loading, register } = useRegister();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi tidak sama");
      return;
    }
    if (!agree) {
      alert("Harus menyetujui syarat dan ketentuan");
      return;
    }

    const success = await register({
      name,
      email,
      password,
      password_confirmation: confirmPassword, 
      jenjang_sekolah: jenjangSekolah,
      asal_sekolah: asalSekolah,
    });

    if (success) {
      navigate(-1); 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#E4004B] via-[#ED775A] to-[#C9CDCF]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-md bg-white/70 shadow-xl rounded-2xl border border-[#C9CDCF]/40">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-[#E4004B]">
              Buat Akun Baru
            </CardTitle>
            <CardDescription className="text-gray-700">
              Daftarkan akun kamu untuk mulai menggunakan aplikasi.
            </CardDescription>
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
                  className="mt-2 focus-visible:ring-[#ED775A]"
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
                  className="mt-2 focus-visible:ring-[#ED775A]"
                />
              </div>

              <div>
                <Label htmlFor="jenjang">Jenjang Sekolah</Label>
                <select
                  id="jenjang"
                  value={jenjangSekolah}
                  onChange={(e) => setJenjangSekolah(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED775A]"
                >
                  <option value="">-- Pilih Jenjang --</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>

              <div>
                <Label htmlFor="asalSekolah">Asal Sekolah</Label>
                <Input
                  id="asalSekolah"
                  placeholder="Nama sekolah kamu"
                  value={asalSekolah}
                  onChange={(e) => setAsalSekolah(e.target.value)}
                  required
                  type="text"
                  className="mt-2 focus-visible:ring-[#ED775A]"
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
                  className="mt-2 focus-visible:ring-[#ED775A]"
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
                  className="mt-2 focus-visible:ring-[#ED775A]"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="agree"
                  checked={agree}
                  onCheckedChange={(val) => setAgree(Boolean(val))}
                />
                <Label htmlFor="agree" className="cursor-pointer text-sm">
                  Saya setuju dengan{" "}
                  <a href="#" className="underline text-[#E4004B]">
                    syarat & ketentuan
                  </a>
                </Label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-[#E4004B] hover:bg-[#ED775A] transition text-white"
                  disabled={loading}
                >
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
            <p className="text-sm text-gray-700">
              Sudah punya akun?{" "}
              <NavLink
                to="/login"
                className="font-medium text-[#E4004B] hover:underline"
              >
                Masuk
              </NavLink>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
