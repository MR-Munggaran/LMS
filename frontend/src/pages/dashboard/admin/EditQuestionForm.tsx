import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuestion, type QuestionPayload } from "@/hooks/useQuestion";

export function EditQuestionForm() {
  const { questionId } = useParams();
  const { getQuestion, updateQuestion } = useQuestion();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<{ option_text: string; is_correct: boolean }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!questionId) return;
      try {
        const data = await getQuestion(Number(questionId));
        setQuestionText(data.question_text);

        if (data.type === "multiple_choice" && data.options) {
          setOptions(
            data.options.map((opt: { option_text: string; is_correct: boolean; }) => ({
              option_text: opt.option_text,
              is_correct: opt.is_correct,
            }))
          );
        }
      } catch (err) {
        console.error("Gagal memuat pertanyaan", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [questionId, getQuestion]);

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
    if (!questionId) return;

    const payload: QuestionPayload = {
        question_text: questionText,
        type: "multiple_choice", // ✅ langsung cocok dengan backend
        options,
    };

    try {
      await updateQuestion(Number(questionId), payload);
      navigate(-1);
    } catch (err) {
      console.error("Gagal update pertanyaan", err);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

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
        <Label>Opsi Jawaban</Label>
        <div className="space-y-2 mt-2">
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
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeOption(idx)}
              >
                Hapus
              </Button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addOption}>
            Tambah Opsi
          </Button>
        </div>
      </div>

      <Button type="submit" variant="success">
        Update Pertanyaan
      </Button>
    </form>
  );
}
