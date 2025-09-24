import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCourse } from "@/hooks/useCourse"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import type { Course } from "@/hooks/useCourse"

const EditCourse = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getCourse, updateCourse } = useCourse()

  const [course, setCourse] = useState<Course | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch course detail
  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return
      try {
        const data = await getCourse(Number(id))
        setCourse(data)
        setTitle(data.title)
        setDescription(data.description || "")
      } catch (err) {
        console.error(err)
      }
    }
    fetchCourse()
  }, [id, getCourse])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      if (photo) {
        formData.append("photo", photo)
      }

      await updateCourse(Number(id), formData) // ⬅️ pakai FormData
      navigate(-1)
    } catch (err) {
      // error sudah ditangani di useCourse
    } finally {
      setLoading(false)
    }
  }

  if (!course) return <p className="p-6">Loading course...</p>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-[150vh] shadow-lg mb-[50vh]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Edit Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid w-full gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter course title"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                placeholder="Type your description here..."
                className="w-full h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="photo">Course Thumbnail</Label>
              <Input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhoto(e.target.files[0])
                  }
                }}
              />
              {photo ? (
                <p className="text-sm text-gray-500">Selected: {photo.name}</p>
              ) : course?.photo ? (
                <img
                  src={course?.photo}
                  alt="Current course thumbnail"
                  className="mt-2 w-40 rounded-md border"
                />
              ) : null}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditCourse
