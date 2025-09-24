import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  jenjang_sekolah: string;
  asal_sekolah: string;
  avatar?: File | null;
};

const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const register = async ({
    name,
    email,
    password,
    password_confirmation,
    jenjang_sekolah,
    asal_sekolah,
    avatar,
  }: RegisterPayload): Promise<boolean> => {
    setLoading(true);
    try {
      const payload =
        avatar instanceof File
          ? (() => {
              const formData = new FormData();
              formData.append("name", name);
              formData.append("email", email);
              formData.append("password", password);
              formData.append("password_confirmation", password_confirmation);
              formData.append("jenjang_sekolah", jenjang_sekolah);
              formData.append("asal_sekolah", asal_sekolah);
              formData.append("avatar", avatar);
              return formData;
            })()
          : {
              name,
              email,
              password,
              password_confirmation,
              jenjang_sekolah,
              asal_sekolah,
            };

      await axios.post("/api/auth/register", payload, {
        headers:
          avatar instanceof File
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
      });

      toast.success("Registrasi berhasil, silakan login!");
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

export default useRegister;
