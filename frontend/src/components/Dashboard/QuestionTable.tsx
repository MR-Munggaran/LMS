import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { type Question } from "@/hooks/useQuestion";

type QuestionTableProps = {
  questions: Question[];
  meta: {
    current_page: number;
    last_page: number;
  };
  onPageChange: (page: number) => void;
  onDelete?: (id: number) => void;
};

export const QuestionTable = ({
  questions,
  meta,
  onPageChange,
  onDelete,
}: QuestionTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl shadow-sm">
        <div className="overflow-x-auto rounded-md border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[60px] text-center">No</TableHead>
                <TableHead className="text-center">Pertanyaan</TableHead>
                <TableHead className="text-center">Tipe</TableHead>
                <TableHead className="text-center">Jumlah Opsi</TableHead>
                <TableHead className="text-center">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {questions.map((q, idx) => (
                <TableRow key={q.id}>
                <TableCell className="text-center font-medium">{(meta.current_page - 1) * 10 + idx + 1}</TableCell>
                <TableCell className="max-w-md truncate">
                    {q.question_text}
                </TableCell>
                <TableCell className="text-center font-medium">{q.question_type}</TableCell>
                <TableCell className="text-center font-medium">{q.options ? q.options.length : "-"}</TableCell>
                <TableCell className="space-x-2">
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/dashboard/exam/question/${q.id}/edit`)}
                    >
                    Edit
                    </Button>
                    <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete && onDelete(q.id)}
                    >
                    Delete
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        {/* Pagination sederhana */}
        <div className="flex justify-center mt-6 gap-2 my-2">
            <Button
            size="sm"
            variant="outline"
            disabled={meta.current_page <= 1}
            onClick={() => onPageChange(meta.current_page - 1)}
            >
            Prev
            </Button>
            <span>
            Page {meta.current_page} of {meta.last_page}
            </span>
            <Button
            size="sm"
            variant="outline"
            disabled={meta.current_page >= meta.last_page}
            onClick={() => onPageChange(meta.current_page + 1)}
            >
            Next
            </Button>
        </div>
        </div>
    </div>
  );
};
