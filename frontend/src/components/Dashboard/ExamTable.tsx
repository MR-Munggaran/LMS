// ExamTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import type { Exam } from "@/hooks/useExam";
import { useNavigate } from "react-router-dom";
import { DeleteExamButton } from "./DeleteExamButton";

type ExamTableProps = {
  exams: Exam[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  onDelete: (id:number) => void;
};

export const ExamTable = ({ exams, meta, onPageChange, onDelete}: ExamTableProps) => {
  const navigate = useNavigate();
  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1);

  return (
    <div className="rounded-xl shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Question Type</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam, index) => (
              <TableRow key={exam.id}>
                <TableCell className="text-center font-medium">
                  {(meta.current_page - 1) * meta.per_page + (index + 1)}
                </TableCell>
                <TableCell className="font-medium">{exam.title}</TableCell>
                <TableCell>{exam.type}</TableCell>
                <TableCell>{exam.question_type}</TableCell>
                <TableCell>{exam.start_time}</TableCell>
                <TableCell>{exam.end_time}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/dashboard/${exam.id}/exam/edit`)}
                  >
                    Edit
                  </Button>
                  <DeleteExamButton examId={exam.id} onDelete={onDelete} />
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => navigate(`/dashboard/exam/question/${exam.id}`)}
                  >
                    Question
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/dashboard/exam/result/${exam.id}`)}
                  >
                    View Score
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (meta.current_page > 1) onPageChange(meta.current_page - 1);
                }}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === meta.current_page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {meta.last_page > 5 && <PaginationEllipsis />}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (meta.current_page < meta.last_page)
                    onPageChange(meta.current_page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
