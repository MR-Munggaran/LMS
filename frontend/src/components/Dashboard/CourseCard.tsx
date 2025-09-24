import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { getImageUrl } from "@/components/getImageUrl"
import type { Course } from "@/hooks/useCourse"

type CourseCardProps = {
  course: Pick<Course, "id" | "title" | "description" | "photo">
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card
      key={course.id}
      className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] py-0 pb-5"
    >
      <img
        src={getImageUrl(course.photo || "")}
        alt={course.title}
        className="h-40 w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button asChild className="w-full">
          <Link to={`/dashboard/student/courses/${course.id}/modules`}>
            Lihat Detail
          </Link>
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <Link to={`/dashboard/student/exam/${course.id}`}>
            List Exam
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
