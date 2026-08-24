import { useEffect, useState } from "react"
import { useEnrollment, type Enrollment, type PaginatedResponse as EnrollmentResponse } from "@/hooks/useEnrollment"
import { useCourse, type PaginatedResponse as CourseResponse } from "@/hooks/useCourse"
import { useAuthContext } from "@/context/AuthContext"
import { AvailableCoursesSection } from "@/components/Dashboard/AvailableCoursesSection"
import { EnrolledCoursesSection } from "@/components/Dashboard/EnrolledCoursesSection"
import { EnrollDialog } from "@/components/Dashboard/EnrollDialog"

function CoursesStudent() {
  const { user } = useAuthContext()
  const { getUserEnrollments, enrollToCourse } = useEnrollment()
  const { getCourses } = useCourse()

  const [enrollments, setEnrollments] = useState<EnrollmentResponse<Enrollment> | null>(null)
  const [courses, setCourses] = useState<CourseResponse | null>(null)

  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

  const [enrollPage, setEnrollPage] = useState(1)
  const [coursePage] = useState(1)

  const fetchData = async (ep = enrollPage, cp = coursePage) => {
    if (!user) return
    setLoading(true)
    try {
      const [enrollData, courseData] = await Promise.all([
        getUserEnrollments(user.id, ep),
        getCourses(cp),
      ])
      setEnrollments(enrollData)
      setCourses(courseData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user, enrollPage, coursePage])

  const handleEnroll = async () => {
    if (!selectedCourseId || !user) return
    try {
      await enrollToCourse(selectedCourseId)
      setOpenModal(false)
      setSelectedCourseId(null)
      fetchData()
    } catch {}
  }

  if (loading) return <p className="text-center py-10">Loading...</p>

  const enrolledCourseIds = new Set(enrollments?.data.map((e) => e.course?.id))
  const availableCourses = courses?.data.filter((c) => !enrolledCourseIds.has(c.id)) || []

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        <AvailableCoursesSection availableCourses={availableCourses} onOpenModal={() => setOpenModal(true)} />
        {enrollments && (
          <EnrolledCoursesSection
            enrollments={enrollments}
            enrollPage={enrollPage}
            setEnrollPage={setEnrollPage}
          />
        )}
      </div>

      <EnrollDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        availableCourses={availableCourses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        onEnroll={handleEnroll}
      />
    </div>
  )
}

export default CoursesStudent
