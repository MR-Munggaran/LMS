import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useExamSession, type ExamResult } from "@/hooks/useExamSession"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

export default function UserResultsPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const { getUserResults } = useExamSession()

  const [results, setResults] = useState<ExamResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!userId) return
      try {
        const data = await getUserResults(Number(userId))
        console.log(data)
        setResults(data)
      } catch {
        toast.error("Gagal memuat hasil ujian")
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [userId, getUserResults])

  if (loading) {
    return <p className="p-6">Memuat hasil ujian...</p>
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.length === 0 ? (
        <p className="text-sm text-gray-500 col-span-full">
          Belum ada hasil ujian.
        </p>
      ) : (
        results.map((res) => (
          <Card key={res.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Ujian #{res.exam_id}
              </CardTitle>
              <CardDescription>
                Submit : {new Date(res.submitted_at).toLocaleDateString("id-ID")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              <p>
                <span className="font-medium">Skor:</span>{" "}
                <span className="font-bold">{res.score}</span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
