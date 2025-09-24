import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type ExamSubmitResponse = {
  meta: any
  data: any
  score: number
  correct: number
  wrong: number
  total: number
}

export default function ExamResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result as ExamSubmitResponse | undefined

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <p className="text-lg">Tidak ada hasil ujian ditemukan</p>
        <Button onClick={() => navigate("/dashboard/student")}>
          Kembali ke Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Hasil Ujian</CardTitle>
          <CardDescription>Ringkasan hasil ujian {result.data.user.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Skor */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-green-500">
              <span className="text-2xl font-bold">{result.data.score}</span>
            </div>
            <p className="text-sm text-gray-500">Skor Anda</p>
          </div>

          {/* Progress */}
          <div>
            <Progress
              value={(result.meta.correct / result.meta.total) * 100}
              className="h-3 mb-2"
            />
            <p className="text-sm text-gray-600 text-center">
              Benar {result.meta.correct} / {result.meta.total} soal
            </p>
          </div>

          {/* Detail Info */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <p className="text-lg font-bold text-green-700">{result.meta.correct}</p>
              <p className="text-xs text-gray-600">Benar</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <p className="text-lg font-bold text-red-700">{result.meta.wrong}</p>
              <p className="text-xs text-gray-600">Salah</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-lg font-bold text-gray-700">{result.meta.total}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate("/dashboard/student")}>
            Kembali
          </Button>
          <Button onClick={() => navigate("/dashboard/student/results")}>
            Lihat Riwayat
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
