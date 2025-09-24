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
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import useLogin from "@/hooks/useLogin"; 

export default function LoginTemplate() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loading, login } = useLogin(); 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-gradient-to-br from-[#E4004B] via-[#ED775A] to-[#FAD691]">
      {/* Background gradient pakai palette */}
      <div className="absolute inset-0 -z-10 " />
      {/* Overlay supaya background lebih soft */}
      <div className="absolute inset-0 -z-10 bg-white/40" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-lg bg-white/90 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-[#E4004B]">
              Selamat datang
            </CardTitle>
            <CardDescription className="text-[#6b7280]">
              Masuk ke akun kamu untuk melanjutkan.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-[#333]">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="nama@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="mt-2 border-[#C9CDCF] focus-visible:ring-[#E4004B]"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#333]">
                  Kata Sandi
                </Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  className="mt-2 border-[#C9CDCF] focus-visible:ring-[#E4004B]"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-[#E4004B] hover:bg-[#ED775A] text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Memproses...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-sm text-[#333]">
              Belum punya akun?{" "}
              <NavLink
                to={"/register"}
                className="font-medium text-[#E4004B] hover:text-[#ED775A] transition-colors"
              >
                Daftar
              </NavLink>
            </p>
          </CardFooter>
        </Card>

        <div className="text-xs text-center text-[#333] mt-4 opacity-70">
          <p>Dengan masuk, kamu setuju dengan syarat dan ketentuan kami.</p>
        </div>
      </motion.div>
    </div>
  );
}
