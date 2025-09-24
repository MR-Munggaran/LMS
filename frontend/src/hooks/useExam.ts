import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export type Exam = {
  id: number;
  course_id: number;
  title: string;
  type: "final" | "quiz";
  question_type: "multiple_choice" | "essay" | "mixed";
  start_time: string; // ISO datetime string
  end_time: string;   // ISO datetime string
  created_at: string;
  updated_at: string;
};

export type ExamPayload = {
  title: string;
  type: "final" | "quiz";
  question_type: "multiple_choice" | "essay" | "mixed";
  start_time: string;
  end_time: string;
};

export type PaginatedExams = {
  data: Exam[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
};


export function useExam() {
  const { token } = useAuthContext();

  // Create exam
  const createExam = useCallback(
    async (courseId: number, payload: ExamPayload) => {
      try {
        const { data } = await axios.post(`/api/courses/${courseId}/exams`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Exam berhasil dibuat");
        return data as Exam;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal membuat exam");
        throw error;
      }
    },
    [token]
  );

  // Get paginated exams for a course
  const getExams = useCallback(
    async (courseId: number, page: number = 1) => {
      try {
        const { data } = await axios.get(`/api/courses/${courseId}/exams?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as { data: Exam[]; meta: any; links: any };
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil daftar exam");
        throw error;
      }
    },
    [token]
  );

  // Get single exam
  const getExam = useCallback(
    async (id: number) => {
      try {
        const { data } = await axios.get(`/api/exams/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as Exam;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil detail exam");
        throw error;
      }
    },
    [token]
  );

  // Update exam
  const updateExam = useCallback(
    async (id: number, payload: Partial<ExamPayload>) => {
      try {
        const { data } = await axios.put(`/api/exams/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Exam berhasil diperbarui");
        return data as Exam;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal memperbarui exam");
        throw error;
      }
    },
    [token]
  );

  // Delete exam
  const deleteExam = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`/api/exams/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Exam berhasil dihapus");
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal menghapus exam");
        throw error;
      }
    },
    [token]
  );

  return { createExam, getExams, getExam, updateExam, deleteExam };
}
