import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  useQuestion,
  type PaginatedQuestions,
} from "@/hooks/useQuestion";
import { QuestionTable } from "@/components/Dashboard/QuestionTable";

const QuestionList = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // examId dari URL
  const { getQuestions, deleteQuestion } = useQuestion();

  const [questionData, setQuestionData] = useState<PaginatedQuestions | null>(
    null
  );

  // ambil semua questions berdasarkan examId
  useEffect(() => {
    if (id) {
      getQuestions(Number(id), 1).then(setQuestionData);
    }
  }, [id, getQuestions]);

  // handle delete question
  const handleDelete = async (qid: number) => {
    if (!id) return;
    await deleteQuestion(qid);
    // reload data setelah delete
    getQuestions(Number(id), questionData?.meta.current_page || 1).then(
      setQuestionData
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Tombol Create Question */}
      {id && (
        <div className="flex justify-between">
          <Button
            onClick={() => navigate(-1)}
          >
            Kembali
          </Button>
          <Button
            onClick={() => navigate(`/dashboard/exam/question/${id}/create`)}
          >
            Create Question
          </Button>
        </div>
      )}

      {/* Tabel Question */}
        { id && questionData?.questions?.length ? (
        <QuestionTable
            questions={questionData.questions}
            meta={questionData.meta}
            onPageChange={(page) =>
            getQuestions(Number(id), page).then(setQuestionData)
            }
            onDelete={handleDelete}
        />
        ) : (
        <p>Tidak ada pertanyaan untuk exam ini.</p>
        )}

    </div>
  );
};

export default QuestionList;
