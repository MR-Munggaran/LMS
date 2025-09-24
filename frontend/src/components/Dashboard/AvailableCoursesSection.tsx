import { Button } from "@/components/ui/button"
import type { Course } from "@/hooks/useCourse"

type AvailableCoursesSectionProps = {
  availableCourses: Course[]
  onOpenModal: () => void
}

export function AvailableCoursesSection({ availableCourses, onOpenModal }: AvailableCoursesSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
        📚 Course tersedia
      </h2>
      {availableCourses.length ? (
        <Button onClick={onOpenModal}>
          Enroll ke Course
        </Button>
      ) : (
        <p className="text-gray-600">Tidak ada course baru untuk di-enroll.</p>
      )}
    </section>
  )
}
