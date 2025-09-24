import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export type Question = {
  points?: number;
  question_type: "multiple_choice" | "essay";
  id: number;
  exam_id: number;
  question_text: string;
  type: "multiple_choice" | "essay";
  options?: {
      option_text: string; 
      id: number; 
      is_correct: boolean 
}[]; // kalau MCQ
  created_at: string;
  updated_at: string;
};

export type QuestionPayload = {
  question_text: string;
  type: "multiple_choice" | "essay";
  options?: { option_text: string; is_correct: boolean }[];
};

export type PaginatedQuestions = {
  questions: Question[];
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

export function useQuestion() {
  const { token } = useAuthContext();

  // Create question
  const createQuestion = useCallback(
    async (examId: number, payload: QuestionPayload) => {
      try {
        const { data } = await axios.post(`/api/exams/${examId}/questions`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Pertanyaan berhasil dibuat");
        return data as Question;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal membuat pertanyaan");
        throw error;
      }
    },
    [token]
  );

  // Get paginated questions by exam
  const getQuestions = useCallback(
    async (examId: number, page: number = 1) => {
      try {
        const { data } = await axios.get(
          `/api/exams/${examId}/questions?page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return data as PaginatedQuestions;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil daftar pertanyaan");
        throw error;
      }
    },
    [token]
  );

  // Get single question
  const getQuestion = useCallback(
    async (id: number) => {
      try {
        const { data } = await axios.get(`/api/questions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Perbaikan: gunakan option_text agar konsisten dengan komponen
        const mapped = {
          question_text: data.question_text,
          type: data.type ?? data.question_type,
          options: data.options?.map((opt: any) => ({
            option_text: opt.option_text, // ✅ konsisten dengan EditQuestionForm
            is_correct: opt.is_correct ?? false,
          })),
        };

        return mapped;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil detail pertanyaan");
        throw error;
      }
    },
    [token]
  );

  // Update question
  const updateQuestion = useCallback(
    async (id: number, payload: Partial<QuestionPayload>) => {
      try {
        const { data } = await axios.put(`/api/questions/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Pertanyaan berhasil diperbarui");
        return data as Question;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal memperbarui pertanyaan");
        throw error;
      }
    },
    [token]
  );

  // Delete question
  const deleteQuestion = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`/api/questions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Pertanyaan berhasil dihapus");
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal menghapus pertanyaan");
        throw error;
      }
    },
    [token]
  );

  return {
    createQuestion,
    getQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion,
  };
}
