import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { type Course } from "@/hooks/useCourse"

type Props = {
  courses: Course[]
  loading: boolean
  currentPage: number
  onEdit: (id: number) => void
  onModules: (id: number) => void
  onDelete: (id: number) => void
}

const CourseTable = ({ courses, loading, currentPage, onEdit, onModules, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[200px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <TableRow key={course.id}>
                <TableCell className="text-center font-medium">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="max-w-md truncate">{course.description}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(course.id)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onModules(course.id)}>
                      Modules
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(course.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CourseTable
