import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export type Assignment = {
  id: number;
  module_id: number;
  title: string;
  description?: string;
  document_path?: string | null;
  due_date?: string | null; 
  due_date_raw?: string | null;
  created_at: string;
  updated_at: string;
};

export function useAssignments() {
  const { token } = useAuthContext();

  // Create assignment dengan FormData
  const createAssignment = useCallback(
    async (moduleId: number, formData: FormData) => {
      try {
        const { data } = await axios.post(
          `/api/modules/${moduleId}/assignments`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Assignment berhasil dibuat");
        return data;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal membuat assignment");
        throw error;
      }
    },
    [token]
  );

  // Get all assignments for a module
  const getAssignments = useCallback(
    async (moduleId: number) => {
      try {
        const { data } = await axios.get(
          `/api/modules/${moduleId}/assignments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return data as Assignment[];
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(
          error.response?.data?.message || "Gagal mengambil daftar assignment"
        );
        throw error;
      }
    },
    [token]
  );

  // Get single assignment
  const getAssignment = useCallback(
    async (id: number) => {
      try {
        const { data } = await axios.get(`/api/assignments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as Assignment;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(
          error.response?.data?.message || "Gagal mengambil detail assignment"
        );
        throw error;
      }
    },
    [token]
  );

  // Update assignment dengan FormData
  const updateAssignment = useCallback(
    async (id: number, formData: FormData) => {
      try {
        const { data } = await axios.post(`/api/assignments/${id}${formData ? "?_method=PUT" : ""}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Assignment berhasil diperbarui");
        return data;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(
          error.response?.data?.message || "Gagal memperbarui assignment"
        );
        throw error;
      }
    },
    [token]
  );

  // Delete assignment
  const deleteAssignment = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`/api/assignments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Assignment berhasil dihapus");
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(
          error.response?.data?.message || "Gagal menghapus assignment"
        );
        throw error;
      }
    },
    [token]
  );

  return {
    createAssignment,
    getAssignments,
    getAssignment,
    updateAssignment,
    deleteAssignment,
  };
}