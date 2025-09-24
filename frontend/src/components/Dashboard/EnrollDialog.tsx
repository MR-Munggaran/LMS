import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Course } from "@/hooks/useCourse"

type EnrollDialogProps = {
  open: boolean
  onClose: () => void
  availableCourses: Course[]
  selectedCourseId: number | null
  setSelectedCourseId: (id: number | null) => void
  onEnroll: () => void
}

export function EnrollDialog({
  open,
  onClose,
  availableCourses,
  selectedCourseId,
  setSelectedCourseId,
  onEnroll,
}: EnrollDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Course untuk Enroll</DialogTitle>
          <DialogDescription>Pilih Sesuai Perintah Gurumu</DialogDescription>
        </DialogHeader>

        {availableCourses.length ? (
          <Select
            onValueChange={(val) => setSelectedCourseId(Number(val))}
            value={selectedCourseId?.toString() || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih course..." />
            </SelectTrigger>
            <SelectContent>
              {availableCourses.map((course) => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-gray-600">Tidak ada course baru untuk di-enroll.</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={onEnroll} disabled={!selectedCourseId}>
            Ya, Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
