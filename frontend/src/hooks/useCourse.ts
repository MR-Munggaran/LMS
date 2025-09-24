import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export type Course = {
  created_by: number | undefined;
  id: number;
  title: string;
  description?: string;
  photo?: string | null;
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse = {
  data: Course[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    next: string | null;
    prev: string | null;
  };
};

export function useCourse() {
  const { token } = useAuthContext();

// Create course
  const createCourse = useCallback(
    async (
      payload: Omit<Course, "id" | "created_at" | "updated_at"> | FormData
    ) => {
      try {
        const isFormData = payload instanceof FormData

        const { data } = await axios.post(`/api/courses`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
          },
        })

        toast.success("Course berhasil dibuat")
        return data
      } catch (err) {
        const error = err as AxiosError<any>
        toast.error(error.response?.data?.message || "Gagal membuat course")
        throw error
      }
    },
    [token]
  )

  const getMyCourses = useCallback(
    async (page: number = 1) => {
      try {
        const { data } = await axios.get(`/api/courses/teacher?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        return data as PaginatedResponse
      } catch (err) {
        const error = err as AxiosError<any>
        toast.error(error.response?.data?.message || "Gagal mengambil daftar course")
        throw error
      }
    },
    [token]
  )


  // Get paginated courses
  const getCourses = useCallback(
    async (page: number = 1) => {
      try {
        const { data } = await axios.get(`/api/courses?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as PaginatedResponse;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil daftar course");
        throw error;
      }
    },
    [token]
  );

  // Get single course
  const getCourse = useCallback(
    async (id: number) => {
      try {
        const { data } = await axios.get(`/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as Course;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil detail course");
        throw error;
      }
    },
    [token]
  );

  // Update course
  const updateCourse = useCallback(
    async (
      id: number,
      payload: Partial<Omit<Course, "id" | "created_at" | "updated_at">> | FormData
    ) => {
      try {
        const isFormData = payload instanceof FormData;

        const { data } = await axios.post(
          `/api/courses/${id}${isFormData ? "?_method=PUT" : ""}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
            },
          }
        );

        toast.success("Course berhasil diperbarui");
        return data;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal memperbarui course");
        throw error;
      }
    },
    [token]
  );


  // Delete course
  const deleteCourse = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Course berhasil dihapus");
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal menghapus course");
        throw error;
      }
    },
    [token]
  );

  return {
    createCourse,
    getMyCourses,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
  };
}
