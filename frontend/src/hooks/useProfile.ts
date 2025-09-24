import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

type UpdateProfilePayload = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  jenjang_sekolah?: string;
  asal_sekolah?: string;
  avatar?: File | null;
};

const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const { token, user, setAuth } = useAuthContext();

  const fetchProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAuth({ token, user: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id: number, payload: UpdateProfilePayload) => {
    if (!token) return;
    setLoading(true);
    try {
      let body: any;
      let headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      if (payload.avatar) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(
              key,
              value instanceof File ? value : String(value)
            );
          }
        });
        body = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        body = payload;
        headers["Content-Type"] = "application/json";
      }

      const res = await axios.post(`/api/users/${id}?_method=PUT`, body, {
        headers,
      });

      // 🔑 cek apakah backend return token baru
      if ("token" in res.data) {
        const newToken = res.data.token;
        const newUser = res.data.user;

        // simpan di sessionStorage
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("user", JSON.stringify(newUser));

        // update context
        setAuth({ token: newToken, user: newUser });
      } else {
        // kalau tidak ada token baru → update user saja
        setAuth({ token, user: res.data });
      }

      toast.success("Profile updated successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user && token) {
      void fetchProfile();
    }
  }, [token]);

  return { loading, user, fetchProfile, updateProfile };
};

export default useProfile;
