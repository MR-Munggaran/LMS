import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCourse } from "@/hooks/useCourse"
import useUsers from "@/hooks/useUsers"
import { Users, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const Home = () => {
  const { pagination } = useUsers();
  const { getCourses } = useCourse();
  
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pagination.total > 0) {
      setTotalUsers(pagination.total);
    }
  }, [pagination.total]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const coursesResponse = await getCourses(1);
        setTotalCourses(coursesResponse.meta.total);
        
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getCourses]);

  // Data untuk chart (bisa juga di-fetch dari API)
  const examStatusData = [
    { name: "Completed", value: 70 },
    { name: "Pending", value: 30 },
  ];
  const COLORS = ["#4f46e5", "#e5e7eb"];

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-600">
          Selamat datang di panel admin/guru. Berikut ringkasan aktivitas.
        </p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Siswa + Guru</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : totalCourses.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Aktif tersedia</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Status Pengerjaan Ujian</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={examStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {examStatusData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home