import { Button } from "@/components/ui/button"
import { ClipboardList } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Module } from "@/hooks/useModules"

type ModuleAssignmentsProps = {
  module: Module
}

export function ModuleAssignments({ module }: ModuleAssignmentsProps) {
  const navigate = useNavigate()

  return (
    <div className="ml-4">
      <p className="font-medium">Assignments</p>
      <div className="flex flex-col gap-2 mt-2">
        {module.assignments.length > 0 ? (
          module.assignments.map((assignment) => (
            <Button
              key={assignment.id}
              variant="secondary"
              className="justify-start"
              onClick={() =>
                navigate(`/dashboard/student/assignments/${assignment.id}`)
              }
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              {assignment.title}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Tidak ada tugas</p>
        )}
      </div>
    </div>
  )
}
