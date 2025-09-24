import { useAuthContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export type Submission = {
  id: number;
  assignment_id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  file_url?: string | null;
  answer_text?: string | null;
  score?: number | null;
  created_at: string;
};

export type SubmissionCreateData = {
  file?: File;
  answer_text?: string;
};

export type SubmissionGradeData = {
  score: number;
};

export function useSubmission() {
  const { token } = useAuthContext();

  // Submit tugas
  const submitAssignment = useCallback(
    async (assignmentId: number, payload: SubmissionCreateData) => {
      const formData = new FormData();
      if (payload.file) formData.append("file", payload.file);
      if (payload.answer_text) formData.append("answer_text", payload.answer_text);

      try {
        const { data } = await axios.post(
          `/api/assignments/${assignmentId}/submissions`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Tugas berhasil dikumpulkan");
        return data as Submission;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengumpulkan tugas");
        throw error;
      }
    },
    [token]
  );

  // Ambil semua submissions untuk assignment tertentu
  const getSubmissions = useCallback(
    async (assignmentId: number) => {
      try {
        const { data } = await axios.get(
          `/api/assignments/${assignmentId}/submissions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return data as Submission[];
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal mengambil daftar submissions");
        throw error;
      }
    },
    [token]
  );

  // Beri nilai ke submission
  const gradeSubmission = useCallback(
    async (submissionId: number, payload: SubmissionGradeData) => {
      try {
        const { data } = await axios.put(
          `/api/submissions/${submissionId}/grade`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Nilai berhasil diberikan");
        return data as Submission;
      } catch (err) {
        const error = err as AxiosError<any>;
        toast.error(error.response?.data?.message || "Gagal memberi nilai");
        throw error;
      }
    },
    [token]
  );

  return {
    submitAssignment,
    getSubmissions,
    gradeSubmission,
  };
}
