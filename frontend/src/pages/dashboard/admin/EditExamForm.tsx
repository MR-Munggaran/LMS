import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useExam, type ExamPayload } from "@/hooks/useExam";
import { useNavigate, useParams } from "react-router-dom";

export const EditExamForm = () => {
  const { examId } = useParams(); // id = courseId, examId = exam yg mau di-edit
  const { getExam, updateExam } = useExam();
  const navigate = useNavigate();

  const [form, setForm] = useState<ExamPayload>({
    title: "",
    type: "quiz",
    question_type: "multiple_choice",
    start_time: "",
    end_time: "",
  });

  const [loading, setLoading] = useState(false);

  // Ambil data exam ketika komponen mount
    useEffect(() => {
    if (examId) {
        getExam(Number(examId)).then((exam) => {
        if (exam) {
            setForm({
            title: exam.title,
            type: exam.type,
            question_type: exam.question_type,
            start_time: exam.start_time,
            end_time: exam.end_time,
            });
        }
        });
    }
    }, [examId, getExam]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof ExamPayload;

    setForm((prev) => ({
      ...prev,
      [key]: value as ExamPayload[typeof key],
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examId) return;

    setLoading(true);
    try {
        await updateExam(Number(examId), form);
        navigate(-1); // balik ke halaman sebelumnya
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-2">Edit Exam</h2>

      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Type */}
      <div>
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        >
          <option value="quiz">Quiz</option>
          <option value="final">Final</option>
        </select>
      </div>

      {/* Start Time */}
      <div>
        <Label htmlFor="start_time">Start Time</Label>
        <Input
          type="datetime-local"
          id="start_time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          required
        />
      </div>

      {/* End Time */}
      <div>
        <Label htmlFor="end_time">End Time</Label>
        <Input
          type="datetime-local"
          id="end_time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" variant="success" disabled={loading}>
        {loading ? "Updating..." : "Update Exam"}
      </Button>
    </form>
  );
};
