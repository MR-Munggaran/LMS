import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useExamSession, type ExamResult } from "@/hooks/useExamSession"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import toast from "react-hot-toast"

export default function ExamResultsPage() {
  const { examId } = useParams<{ examId: string }>()
  const { getExamResults } = useExamSession()

  const [results, setResults] = useState<ExamResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!examId) return
      try {
        const data = await getExamResults(Number(examId))
        console.log(data)
        setResults(data)
      } catch {
        toast.error("Gagal memuat hasil ujian")
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [examId, getExamResults])

  if (loading) {
    return <p className="p-6">Memuat hasil ujian...</p>
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Nilai Murid</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada hasil ujian.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">No</TableHead>
                  <TableHead>Nama Siswa</TableHead>

                  <TableHead className="text-center">Skor</TableHead>
                  <TableHead className="text-center">Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((res, idx) => (
                  <TableRow key={res.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {res.user.name}
                    </TableCell>
                    <TableCell className="text-center font-semibold">{res.score}</TableCell>
                    <TableCell className="text-center">
                      {new Date(res.submitted_at).toLocaleDateString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
