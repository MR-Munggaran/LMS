import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAssignments, type Assignment } from "@/hooks/useAssignment"
import { useEffect, useState } from "react"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useNavigate } from "react-router-dom"

type Props = {
  open: boolean
  onClose: () => void
  assignment: Assignment | null
  onUpdated: () => void // callback untuk refresh data setelah update
}

const EditAssignmentModal = ({ open, onClose, assignment, onUpdated }: Props) => {
  const navigate = useNavigate()
  const { updateAssignment } = useAssignments()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [document, setDocument] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // isi state ketika modal dibuka
  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title || "");
      setDescription(assignment.description || "");
      setDueDate(assignment.due_date ? assignment.due_date.replace(" ", "T") : "");
      setDocument(null); // reset dokumen
    }
  }, [assignment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignment) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (dueDate) {
      // convert "2025-09-16T21:30" -> "2025-09-16 21:30"
      formData.append("due_date", dueDate.replace("T", " "));
    }

    if (document) {
      formData.append("document", document);
    }

    setLoading(true);
    try {
      await updateAssignment(assignment.id, formData);
      onUpdated();
      onClose();
    } finally {
      setLoading(false);
      navigate('/courses')
    }
  };


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
          <DialogDescription>Edit Tugas</DialogDescription>
        </DialogHeader>

        {assignment && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>


            <div>
              <Label htmlFor="document">Replace Document (optional)</Label>
              <Input
                id="document"
                type="file"
                onChange={(e) => setDocument(e.target.files?.[0] || null)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EditAssignmentModal
