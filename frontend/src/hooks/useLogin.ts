import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import type { AuthResponse } from "../context/AuthContext";

type LoginPayload = {
  email: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuth } = useAuthContext();

  const login = async ({ email, password }: LoginPayload): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.post<AuthResponse>(
        "/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;
      console.log("Login response:", data);

      // Update context (dan otomatis simpan ke sessionStorage lewat AuthContext)
      setAuth({ token: data.access_token, user: data.user });

      toast.success("Sign in successful!");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
