import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useExam, type ExamPayload } from "@/hooks/useExam";
import { useNavigate, useParams } from "react-router-dom";

export const CreateExamForm = () => {
  const { id } = useParams(); 
  const { createExam } = useExam();
  const navigate = useNavigate();

  const [form, setForm] = useState<ExamPayload>({
    title: "",
    type: "quiz", 
    question_type: "multiple_choice", 
    start_time: "",
    end_time: "",
  });

  const [loading, setLoading] = useState(false);

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
    if (!id) return; // 🚨 antisipasi undefined

    setLoading(true);
    try {
      await createExam(Number(id), form);
      setForm({
        title: "",
        type: "quiz",
        question_type: "multiple_choice",
        start_time: "",
        end_time: "",
      });
      navigate(-1)
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
      <h2 className="text-xl font-semibold mb-2">Create Exam</h2>

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

      {/* Question Type */}
      {/* <div>
        <Label htmlFor="question_type">Question Type</Label>
        <select
          id="question_type"
          name="question_type"
          value={form.question_type}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        >
          <option value="multiple_choice">Multiple Choice</option>
          <option value="essay">Essay</option>
          <option value="mixed">Mixed</option>
        </select>
      </div> */}

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
        {loading ? "Saving..." : "Create Exam"}
      </Button>
    </form>
  );
};
