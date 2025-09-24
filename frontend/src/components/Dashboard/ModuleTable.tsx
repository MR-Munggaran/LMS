import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Plus } from "lucide-react"
import { type Module } from "@/hooks/useModules"

type Props = {
  modules: Module[]
  onView: (module: Module) => void
  onEdit: (courseId: number, moduleId: number) => void
  onCreateAssignment: (id: number) => void
  onDelete: (id: number) => void
}

const ModuleTable = ({ modules, onView, onEdit, onCreateAssignment, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map((module, index) => (
            <TableRow key={module.id}>
              <TableCell className="text-center font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{module.title}</TableCell>
              <TableCell className="max-w-md truncate">{module.content}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCreateAssignment(module.id)}
                    className="flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Assignment
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(module.id)}
                    className="flex items-center gap-1"
                  >
                    Delete
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(module)}>
                        <Eye size={16} className="mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit(module.course_id, module.id)}
                      >
                        <Edit size={16} className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {modules.length === 0 && (
        <p className="p-4 text-center text-gray-500">No modules found</p>
      )}
    </div>
  )
}

export default ModuleTable
