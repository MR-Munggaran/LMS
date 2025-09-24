import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

// Tipe untuk jawaban yang dikirim saat submit
export type ExamAnswer = {
  question_id: number;
  answer_text?: string; // untuk essay
  option_id?: number;   // untuk multiple choice
};

// Tipe detail hasil ujian (per jawaban)
export type ExamAnswerResult = {
  question_id: number;
  is_correct: boolean;
  answer_text?: string;
  option_id?: number;
  points_awarded: number;
};

// Tipe hasil ujian lengkap
export type ExamResult = {
  user: any;
  submitted_at: string | number | Date;
  id: number;
  exam_id: number;
  user_id: number;
  score: number;
  correct: number;
  wrong: number;
  total: number;
  answers: ExamAnswerResult[];
  created_at: string;
  updated_at: string;
};

// Tipe ringkasan submit ujian
export type ExamSubmitResponse = {
  score: number;
  correct: number;
  wrong: number;
  total: number;
};

export function useExamSession() {
  const { token } = useAuthContext();

  // Start exam
  const startExam = useCallback(
    async (examId: number) => {
      try {
        const { data } = await axios.post(
          `/api/exams/${examId}/start`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Ujian dimulai");
        return data;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal memulai ujian");
        throw error;
      }
    },
    [token]
  );

  // Submit exam
  const submitExam = useCallback(
    async (examId: number, answers: ExamAnswer[]) => {
      try {
        const { data } = await axios.post(
          `/api/exams/${examId}/submit`,
          { answers },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Jawaban berhasil dikumpulkan");
        return data as ExamSubmitResponse;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal submit ujian");
        throw error;
      }
    },
    [token]
  );

  // Get results of an exam (semua peserta)
  const getExamResults = useCallback(
    async (examId: number) => {
      try {
        const { data } = await axios.get(`/api/exams/${examId}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as ExamResult[];
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil hasil ujian");
        throw error;
      }
    },
    [token]
  );

  // Get results of a user (semua exam yang pernah diikuti user)
  const getUserResults = useCallback(
    async (userId: number) => {
      try {
        const { data } = await axios.get(`/api/users/${userId}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as ExamResult[];
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil hasil user");
        throw error;
      }
    },
    [token]
  );

  // Get single result detail
  const getResult = useCallback(
    async (resultId: number) => {
      try {
        const { data } = await axios.get(`/api/results/${resultId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data as ExamResult;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil detail hasil");
        throw error;
      }
    },
    [token]
  );

  return {
    startExam,
    submitExam,
    getExamResults,
    getUserResults,
    getResult,
  };
}
