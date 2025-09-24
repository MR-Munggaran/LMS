import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useExam } from "@/hooks/useExam";
import { useExamSession, type ExamAnswer } from "@/hooks/useExamSession";
import toast from "react-hot-toast";

type Question = {
  id: number;
  question_text: string;
  options?: { id: number; option_text: string }[]; // multiple choice
};

export default function ExamSession() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { getExam } = useExam();
  const { startExam, submitExam } = useExamSession();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // default 5 menit
  const [openConfirm, setOpenConfirm] = useState(false);

  // Mulai ujian + ambil data soal
  useEffect(() => {
    if (!examId) return;
    const initExam = async () => {
      try {
        await startExam(Number(examId));
        const exam = await getExam(Number(examId));

        setQuestions((exam as any).questions || []);
        if ((exam as any).duration) {
          setTimeLeft((exam as any).duration * 60); // duration (menit) → detik
        }
      } catch {
        toast.error("Gagal memulai ujian");
        navigate(-1);
      }
    };
    initExam();
  }, [examId, startExam, getExam, navigate]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit kalau waktu habis
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (qid: number, ans: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: ans }));
  };

  const handleSubmit = async () => {
    if (!examId) return;
    try {
      const payload: ExamAnswer[] = Object.entries(answers).map(
        ([qid, ans]) => {
          const q = questions.find((qq) => qq.id === Number(qid));
          const isMCQ = q?.options && q.options.length > 0;
          return {
            question_id: Number(qid),
            ...(isMCQ ? { option_id: Number(ans) } : { answer_text: ans }),
          };
        }
      );

      const result = await submitExam(Number(examId), payload);

      navigate("/dashboard/student/results/exam", {
        state: { result }, // sudah ada score, correct, wrong, total
      });
    } catch {
      toast.error("Gagal submit jawaban");
    }
  };

  if (!questions.length)
    return <p className="p-6">Memuat soal ujian...</p>;

  const percent = ((current + 1) / questions.length) * 100;

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl font-bold">Exam</h1>
        <div className="text-sm font-medium">
          Waktu Tersisa:{" "}
          <span className="text-red-600">
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Progress value={percent} className="mb-4" />

        {/* Info soal */}
        <div className="flex justify-between items-center mb-4 text-sm font-medium">
          <span>
            Soal {current + 1} dari {questions.length}
          </span>
        </div>

        {/* Soal */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            {questions[current].question_text}
          </h2>
          {questions[current].options && (
            <RadioGroup
              value={answers[questions[current].id] || ""}
              onValueChange={(val) =>
                handleAnswer(questions[current].id, val)
              }
            >
              {questions[current].options!.map((opt) => (
                <div key={opt.id} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem
                    value={String(opt.id)}
                    id={`${questions[current].id}-${opt.id}`}
                  />
                  <Label htmlFor={`${questions[current].id}-${opt.id}`}>
                    {opt.option_text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Navigation number buttons */}
        <div className="grid grid-cols-6 gap-2 mb-6">
          {questions.map((q, idx) => (
            <Button
              key={q.id}
              size="sm"
              variant={idx === current ? "default" : "outline"}
              className={answers[q.id] ? "border-green-500 text-green-600" : ""}
              onClick={() => setCurrent(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
        <Button
          variant="outline"
          onClick={() => setCurrent((c) => c - 1)}
          disabled={current === 0}
        >
          Previous
        </Button>

        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent((c) => c + 1)}>Next</Button>
        ) : (
          <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
            <AlertDialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Submit</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin mengumpulkan jawaban? Setelah submit,
                  Anda tidak bisa mengubah jawaban lagi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>
                  Ya, Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </footer>
    </div>
  );
}
