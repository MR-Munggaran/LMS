import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Submission } from "@/hooks/useSubmission";

type Props = {
  submissions: Submission[];
  onGrade: (submissionId: number, score: number) => Promise<void>;
};

const SubmissionsList = ({ submissions, onGrade }: Props) => {
  const [grading, setGrading] = useState<{ [key: number]: string }>({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Submissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {submissions.length > 0 ? (
          submissions.map((sub) => (
            <div key={sub.id} className="p-3 border rounded-md space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{sub.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {sub.answer_text || "Tidak ada jawaban teks"}
                  </p>
                  {sub.file_url && (
                    <a
                      href={sub.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      Lihat File
                    </a>
                  )}
                </div>
                <p className="text-sm">Score: {sub.score ?? "Belum dinilai"}</p>
              </div>

              {/* Form memberi nilai */}
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Nilai"
                  value={grading[sub.id] || ""}
                  onChange={(e) =>
                    setGrading((prev) => ({ ...prev, [sub.id]: e.target.value }))
                  }
                  className="w-24"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    const score = grading[sub.id];
                    if (score) onGrade(sub.id, Number(score));
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Belum ada submission</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionsList;
