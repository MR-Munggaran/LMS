import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export type Assignment = {
  id: number;
  module_id: number;
  title: string;
  description: string;
  document_url?: string | null;
  due_date?: string | null;
  due_date_raw?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type Module = {
  id: number;
  course_id: number;
  title: string;
  content?: string;
  document_url?: string | null;
  document_path?: string | null;
  video_url?: string | null;
  created_at: string;
  updated_at: string;
  assignments: Assignment[];
};

export type ModuleCreateData = {
  title: string;
  content?: string;
  video_url?: string;
  document?: File;
};

export type ModuleUpdateData = Partial<ModuleCreateData>;

export function useModules() {
  const { token } = useAuthContext();

  // Create module
  const createModule = useCallback(
    async (courseId: number, payload: ModuleCreateData) => {
      const formData = new FormData();
      formData.append("title", payload.title);

      if (payload.content) formData.append("content", payload.content);
      if (payload.video_url) formData.append("video_url", payload.video_url);
      if (payload.document) formData.append("document", payload.document);

      try {
        const { data } = await axios.post(
          `/api/courses/${courseId}/modules`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Module berhasil dibuat");
        return data as Module;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal membuat module");
        throw error;
      }
    },
    [token]
  );

  // Get all modules for a course
  const getModules = useCallback(
    async (courseId: number) => {
      try {
        const { data } = await axios.get(`/api/courses/${courseId}/modules`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as Module[];
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(
          error.response?.data?.message || "Gagal mengambil daftar module"
        );
        throw error;
      }
    },
    [token]
  );

  // Get single module
  const getModule = useCallback(
    async (id: number) => {
      try {
        const { data } = await axios.get(`/api/modules/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as Module;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(
          error.response?.data?.message || "Gagal mengambil detail module"
        );
        throw error;
      }
    },
    [token]
  );

  // Update module
  const updateModule = useCallback(
    async (id: number, payload: ModuleUpdateData) => {
      const formData = new FormData();
      formData.append("title", payload.title ?? "");
      formData.append("content", payload.content ?? "");
      formData.append("video_url", payload.video_url ?? "");
      if (payload.document) formData.append("document", payload.document);

      try {
        const { data } = await axios.post(
          `/api/modules/${id}?_method=PUT`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Module berhasil diperbarui");
        return data as Module;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal memperbarui module");
        throw error;
      }
    },
    [token]
  );

    // Delete module
  const deleteModule = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`/api/modules/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Module berhasil dihapus");
        return true;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal menghapus module");
        throw error;
      }
    },
    [token]
  );


  return {
    createModule,
    getModules,
    getModule,
    updateModule,
    deleteModule
  };
}
