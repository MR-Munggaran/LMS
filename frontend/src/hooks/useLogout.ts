import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { token, setAuth } = useAuthContext();

  const logout = async (): Promise<void> => {
    if (!token) {
      setAuth(null);
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset context (dan sessionStorage otomatis clear)
      setAuth(null);

      toast.success("Logged out successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message || error.message || "Logout failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
