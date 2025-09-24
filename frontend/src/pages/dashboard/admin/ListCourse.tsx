import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useCourse, type Course, type PaginatedResponse } from "@/hooks/useCourse"
import { useEffect, useState } from "react"
import CourseTable from "@/components/Dashboard/CourseTable"
import CoursePagination from "@/components/Dashboard/CoursePagination"

const ListCourse = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const navigator = useNavigate()
  const { getMyCourses, deleteCourse } = useCourse()

  const loadCourses = async (page: number = 1) => {
    setLoading(true)
    try {
      const data: PaginatedResponse = await getMyCourses(page)
      setCourses(data.data)
      setCurrentPage(data.meta.current_page)
      setLastPage(data.meta.last_page)
    } catch (err) {
      console.error("Failed to fetch courses", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const navEdit = (id: number) => navigator(`/dashboard/courses/edit/${id}`)
  const navModules = (id: number) => navigator(`/dashboard/courses/${id}/modules`)
  const navCreate = () => navigator("/dashboard/courses/create")

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return
    try {
      await deleteCourse(id)
      loadCourses(currentPage)
    } catch (err) {
      console.error("Failed to delete course", err)
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) loadCourses(page)
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Course List</h2>

      <div className="my-5">
        <Button variant="secondary" onClick={navCreate}>
          Create
        </Button>
      </div>

      <CourseTable
        courses={courses}
        loading={loading}
        currentPage={currentPage}
        onEdit={navEdit}
        onModules={navModules}
        onDelete={handleDelete}
      />

      <CoursePagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default ListCourse
