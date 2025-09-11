import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function LoginTemplate() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // demo: simulate API call
    setTimeout(() => {
      setLoading(false);
      // TODO: replace with your auth logic (call API, handle tokens, redirect)
      alert(`Logging in ${email}`);
    }, 800);
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
            <CardTitle className="text-2xl">Selamat datang</CardTitle>
            <CardDescription>Masuk ke akun kamu untuk melanjutkan.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="text-sm mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={(val) => setRemember(Boolean(val))}
                    />
                    <Label htmlFor="remember" className="cursor-pointer">Ingat saya</Label>
                  </div>

                  <a href="#" className="text-sm hover:underline">
                    Lupa kata sandi?
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </div>
            </form>

          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-sm">Belum punya akun? <NavLink to={'/register'} className="font-medium hover:underline">Daftar</NavLink></p>
          </CardFooter>
        </Card>

        <div className="text-xs text-center text-muted-foreground mt-4">
          <p>Dengan masuk, kamu setuju dengan syarat dan ketentuan kami.</p>
        </div>
      </motion.div>
    </div>
  );
}