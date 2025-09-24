import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExam, type Exam } from "@/hooks/useExam";
import { useExamSession } from "@/hooks/useExamSession";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

export function StudentExamList() {
  const { courseId } = useParams<{ courseId: string }>();
  const { getExams } = useExam();
  const { startExam } = useExamSession();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!courseId) return;
    const fetchExams = async () => {
      setLoading(true);
      try {
        const data = await getExams(Number(courseId));
        setExams(data.data);
      } catch {
        toast.error("Gagal memuat daftar ujian");
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [courseId, getExams]);

  const handleStartExam = async (examId: number) => {
    try {
      const session = await startExam(examId);
      navigate(`/dashboard/student/session/exam/${examId}/${session.session_id}`);
    } catch {
      // error sudah di-toast dari hook
    }
  };

  if (loading) return <p className="text-center mt-4">Memuat daftar ujian...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button
          variant="warning"
          onClick={() => navigate(`/dashboard/student/exam/result/list/${user?.id}`)}
        >
          Your Score
        </Button>
      </div>

      {exams.length === 0 ? (
        <p className="text-center text-muted-foreground">Tidak ada ujian tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <Card key={exam.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{exam.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  Tipe: {exam.type} | Soal: {exam.question_type}
                </p>
                <p className="text-sm text-muted-foreground">
                  Waktu: {new Date(exam.start_time).toLocaleString()} -{" "}
                  {new Date(exam.end_time).toLocaleString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleStartExam(exam.id)}>
                  Start Exam
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
