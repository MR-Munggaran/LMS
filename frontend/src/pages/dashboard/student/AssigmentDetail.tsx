// pages/AssignmentDetail.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssignments, type Assignment } from "@/hooks/useAssignment";
import { useSubmission, type Submission } from "@/hooks/useSubmission";
import { useAuthContext } from "@/context/AuthContext";
import AssignmentInfo from "@/components/Dashboard/student/AssignmentInfo";
import AssignmentSubmitForm from "@/components/Dashboard/student/AssignmentSubmitForm";
import SubmissionsList from "@/components/Dashboard/student/SubmissionsList";

const AssignmentDetail = () => {
  const { id } = useParams();
  const { getAssignment } = useAssignments();
  const { getSubmissions, submitAssignment, gradeSubmission } = useSubmission();
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const assignmentData = await getAssignment(Number(id));
        setAssignment(assignmentData);

        if (user?.role?.name === "teacher" || user?.role?.name === "admin") {
          const subs = await getSubmissions(Number(id));
          setSubmissions(subs);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id, getAssignment, getSubmissions, user]);

  const handleSubmit = async (file: File | null, answerText: string) => {
    if (!id) return;
    try {
      const submission = await submitAssignment(Number(id), {
        file: file ?? undefined,
        answer_text: answerText || undefined,
      });
      setSubmissions((prev) => [...prev, submission]);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGrade = async (submissionId: number, score: number) => {
    try {
      const updated = await gradeSubmission(submissionId, { score });
      setSubmissions((prev) =>
        prev.map((s) => (s.id === submissionId ? updated : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!assignment) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <AssignmentInfo assignment={assignment} />

      {user?.role?.name === "student" && (
        <AssignmentSubmitForm onSubmit={handleSubmit} />
      )}

      {(user?.role?.name === "teacher" || user?.role?.name === "admin") && (
        <SubmissionsList submissions={submissions} onGrade={handleGrade} />
      )}
    </div>
  );
};

export default AssignmentDetail;
