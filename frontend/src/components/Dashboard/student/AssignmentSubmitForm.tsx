import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  onSubmit: (file: File | null, answerText: string) => Promise<void>;
};

const AssignmentSubmitForm = ({ onSubmit }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [answerText, setAnswerText] = useState("");

  const handleSubmit = () => {
    onSubmit(file, answerText).then(() => {
      setFile(null);
      setAnswerText("");
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kumpulkan Tugas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Tuliskan jawaban di sini..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button onClick={handleSubmit}>Kumpulkan</Button>
      </CardContent>
    </Card>
  );
};

export default AssignmentSubmitForm;
