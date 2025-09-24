import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Module } from "@/hooks/useModules"
import type { Assignment } from "@/hooks/useAssignment"
import { useAssignments } from "@/hooks/useAssignment"
import getYoutubeEmbedUrl from "../urlYoutube"
import EditAssignmentModal from "./EditAssignmentModal"
import { useNavigate } from "react-router-dom"

type Props = {
  open: boolean
  onClose: () => void
  moduleData: Module | null
  refreshModule: () => void // callback untuk reload module data dari parent
}

type ModuleAssignment = import("@/hooks/useModules").Assignment;
type ApiAssignment = import("@/hooks/useAssignment").Assignment;

const ViewModuleModal = ({ open, onClose, moduleData, refreshModule }: Props) => {
  const { deleteAssignment } = useAssignments()
  const [editOpen, setEditOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(false)
  const navigator = useNavigate()

  if (!moduleData) return null
  const youtubeEmbedUrl = moduleData.video_url ? getYoutubeEmbedUrl(moduleData.video_url) : null

  const handleEdit = (assignment: ModuleAssignment) => {
    setSelectedAssignment(assignment as ApiAssignment)
    setEditOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return
    setLoading(true)
    try {
      await deleteAssignment(id)
      refreshModule() // refresh module setelah delete
    } finally {
      setLoading(false)
    }
  }

  const NavSubmissionDetail = (id : number) => {
    navigator(`/dashboard/student/assignments/${id}`)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{moduleData.title}</DialogTitle>
            <DialogDescription>Detail materi pembelajaran</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Konten materi */}
            {moduleData.content && (
              <div>
                <h3 className="font-semibold mb-2">Content</h3>
                <p className="text-gray-700 whitespace-pre-line">{moduleData.content}</p>
              </div>
            )}

            {/* Assignments */}
            {moduleData.assignments && moduleData.assignments.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-lg">Assignments</h3>
                <Accordion type="single" collapsible className="w-full">
                  {moduleData.assignments.map((assignment) => (
                    <AccordionItem key={assignment.id} value={`assignment-${assignment.id}`}>
                      <AccordionTrigger>{assignment.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 mb-2 whitespace-pre-line">
                          {assignment.description}
                        </p>
                        {assignment.document_url && (
                          <a
                            href={assignment.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline block mb-2"
                          >
                            View / Download Assignment
                          </a>
                        )}
                        {assignment.due_date && (
                          <p className="text-sm text-gray-500 mb-4">
                            Due date: {new Date(assignment.due_date).toLocaleDateString()}
                          </p>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(assignment)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(assignment.id)}
                            disabled={loading}
                          >
                            {loading ? "Deleting..." : "Delete"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={()=>NavSubmissionDetail(assignment.id)}
                          >
                            Pengumpulan Tugas
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Document preview / download */}
            <div>
              <h3 className="font-semibold mb-2">Document</h3>
              {moduleData.document_url ? (
                <a
                  href={moduleData.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View / Download Document
                </a>
              ) : (
                <p className="text-gray-500 text-sm">No document available.</p>
              )}
            </div>

            {/* Video embed */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">Video Pembelajaran</h3>
              {youtubeEmbedUrl ? (
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-5">
                  <iframe
                    src={youtubeEmbedUrl}
                    title="Video Pembelajaran"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No video provided.</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Assignment */}
      <EditAssignmentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        assignment={selectedAssignment}
        onUpdated={refreshModule}
      />
    </>
  )
}

export default ViewModuleModal
