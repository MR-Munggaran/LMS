import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export type Enrollment = {
  id: number;
  user_id: number;
  course_id: number;
  progress: number;
  created_at: string;
  updated_at: string;
  course?: {
    id: number;
    title: string;
    description?: string;
    photo?: string | null;
  };
};

export type PaginatedResponse<T> = {
  data: T[];
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

export function useEnrollment() {
  const { token } = useAuthContext();

  // Enroll ke course
  const enrollToCourse = useCallback(
    async (courseId: number) => {
      try {
        const { data } = await axios.post(
          `/api/courses/${courseId}/enroll`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Berhasil mendaftar ke course");
        return data as Enrollment;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mendaftar ke course");
        throw error;
      }
    },
    [token]
  );

  // Get daftar enrollment user (paginate)
  const getUserEnrollments = useCallback(
    async (userId: number, page: number = 1) => {
      try {
        const { data } = await axios.get(
          `/api/users/${userId}/enrollments?page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return data as PaginatedResponse<Enrollment>;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(
          error.response?.data?.message || "Gagal mengambil daftar enrollment"
        );
        throw error;
      }
    },
    [token]
  );

  // Update progress belajar
  const updateProgress = useCallback(
    async (enrollmentId: number, progress: number) => {
      try {
        const { data } = await axios.put(
          `/api/enrollments/${enrollmentId}/progress`,
          { progress },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Progress berhasil diperbarui");
        return data as Enrollment;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal memperbarui progress");
        throw error;
      }
    },
    [token]
  );

  return {
    enrollToCourse,
    getUserEnrollments,
    updateProgress,
  };
}
