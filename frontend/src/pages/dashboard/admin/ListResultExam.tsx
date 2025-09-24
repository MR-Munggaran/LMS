import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ListResultExam = () => {
  const results = [
    {
      id: 1,
      examName: "Midterm Mathematics",
      studentName: "John Doe",
      score: 85,
      submittedAt: "2025-09-12 14:30",
    },
    {
      id: 2,
      examName: "Physics Final",
      studentName: "Jane Smith",
      score: 92,
      submittedAt: "2025-09-12 15:10",
    },
    {
      id: 3,
      examName: "History Quiz",
      studentName: "Michael Brown",
      score: 60,
      submittedAt: "2025-09-11 10:45",
    },
    {
      id: 4,
      examName: "Biology Midterm",
      studentName: "Emily Johnson",
      score: 72,
      submittedAt: "2025-09-10 09:20",
    },
  ]

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Exam Results</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">No</TableHead>
              <TableHead>Exam Name</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => {
              const isPassed = result.score >= 75
              return (
                <TableRow key={result.id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{result.examName}</TableCell>
                  <TableCell>{result.studentName}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={isPassed ? "success" : "destructive"}
                      className="px-3"
                    >
                      {result.score} {isPassed ? "Lulus" : "Remedial"}
                    </Badge>
                  </TableCell>
                  <TableCell>{result.submittedAt}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default ListResultExam
