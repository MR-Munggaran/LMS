import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuestion, type QuestionPayload } from "@/hooks/useQuestion";


export function CreateQuestionForm() {
  const { id:examId } = useParams(); // ambil dari URL params
  const { createQuestion } = useQuestion();
  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<"multiple_choice" | "essay">("essay");
  const [points, setPoints] = useState<number>(0);
  const [options, setOptions] = useState<{ option_text: string; is_correct: boolean }[]>([]);

  const addOption = () => {
    setOptions([...options, { option_text: "", is_correct: false }]);
  };

  const updateOption = (index: number, key: "option_text" | "is_correct", value: any) => {
    const newOptions = [...options];
    (newOptions[index] as any)[key] = value;
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examId) {
      console.error("Exam ID tidak ditemukan di URL");
      return;
    }

    const payload: any = {
      question_text: questionText,
      question_type: questionType,
      points,
    };

    if (questionType === "multiple_choice") {
      payload.options = options;
    }

    try {
      await createQuestion(Number(examId), payload as QuestionPayload);
      setQuestionText("");
      setPoints(0);
      setOptions([]);
      navigate(-1)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Pertanyaan</Label>
        <Textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Tulis pertanyaan di sini..."
        />
      </div>

      <div>
        <Label>Tipe Pertanyaan</Label>
        <Select
          value={questionType}
          onValueChange={(val: "multiple_choice" | "essay") => setQuestionType(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih tipe" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="essay">Essay</SelectItem> */}
            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {questionType === "multiple_choice" && (
        <div className="space-y-2">
          <Label>Opsi Jawaban</Label>
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                placeholder={`Opsi ${idx + 1}`}
                value={opt.option_text}
                onChange={(e) => updateOption(idx, "option_text", e.target.value)}
              />
              <Checkbox
                checked={opt.is_correct}
                onCheckedChange={(checked) =>
                  updateOption(idx, "is_correct", checked === true)
                }
              />
              <span className="text-sm">Benar</span>
              <Button type="button" variant="destructive" size="sm" onClick={() => removeOption(idx)}>
                Hapus
              </Button>
            </div>
          ))}
          <Button type="button" variant="info" onClick={addOption}>
            Tambah Opsi
          </Button>
        </div>
      )}

      <Button type="submit" variant="success">Simpan Pertanyaan</Button>
    </form>
  );
}
