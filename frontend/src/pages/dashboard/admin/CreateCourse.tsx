import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCourse } from "@/hooks/useCourse"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext" 
import { getImageUrl } from '@/components/getImageUrl'

const CreateCourse = () => {
  const navigate = useNavigate()
  const { createCourse } = useCourse()
  const { user } = useAuthContext()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      if (photo) {
        formData.append("photo", photo)
      }

      if (user?.id) {
        formData.append("created_by", user.id.toString())
      }

      await createCourse(formData)
      setTitle("")
      setDescription("")
      setPhoto(null)
      navigate(-1)
    } catch (err) {
      // error sudah ditangani di useCourse dengan toast
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-[150vh] shadow-lg mb-[50vh]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Course</CardTitle>
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
              {photo && (
                <p className="text-sm text-gray-500">
                  Selected: {getImageUrl(photo.name)}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="success" disabled={loading}>
                {loading ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateCourse
