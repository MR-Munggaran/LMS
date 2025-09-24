import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { CourseCard } from "./CourseCard"
import type { Enrollment } from "@/hooks/useEnrollment"
import type { Course } from "@/hooks/useCourse"

type EnrolledCoursesSectionProps = {
  enrollments: {
    data: Enrollment[]
    meta: { last_page: number }
  }
  enrollPage: number
  setEnrollPage: (page: number) => void
}

export function EnrolledCoursesSection({
  enrollments,
  enrollPage,
  setEnrollPage,
}: EnrolledCoursesSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
        ✅ Course yang diikuti
      </h2>

      {enrollments?.data.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {enrollments.data.map((enrollment) => {
              if (!enrollment.course) return null

              // ambil hanya field yang dipakai CourseCard
              const { id, title, description, photo } = enrollment.course
              const minimalCourse: Pick<
                Course,
                "id" | "title" | "description" | "photo"
              > = { id, title, description, photo }

              return (
                <CourseCard key={enrollment.id} course={minimalCourse} />
              )
            })}
          </div>

          {/* Pagination */}
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setEnrollPage(Math.max(enrollPage - 1, 1))}
                />
              </PaginationItem>
              {Array.from({ length: enrollments.meta.last_page }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={enrollPage === i + 1}
                    onClick={() => setEnrollPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setEnrollPage(
                      Math.min(enrollPage + 1, enrollments.meta.last_page),
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <p className="text-gray-600">Belum ada course yang diikuti.</p>
      )}
    </section>
  )
}
