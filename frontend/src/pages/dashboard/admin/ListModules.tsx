import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useModules, type Module } from "@/hooks/useModules"
import { useNavigate, useParams } from "react-router-dom"
import ViewModuleModal from "@/components/Dashboard/ViewModuleModal"
import ModuleTable from "@/components/Dashboard/ModuleTable"
import { Plus } from "lucide-react"
import { toast } from "react-hot-toast"

const ListModules = () => {
  const { courseId } = useParams<{ courseId: string }>() 
  const { getModules, deleteModule } = useModules()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)

  const navigator = useNavigate()

  const fetchModules = async () => {
    if (!courseId) return
    setLoading(true)
    try {
      const data = await getModules(Number(courseId))
      setModules(data)
    } catch (err) {
      console.error(err)
      toast.error("Gagal memuat modul")
    } finally {
      setLoading(false)
    }
  }

  const navCreate = () => navigator(`/dashboard/module/${courseId}/modules`)
  const navCreateAssignment = (id: number) =>
    navigator(`/dashboard/assignment/${id}/assignments`)
  const navEditModule = (courseId: number, moduleId: number) =>
    navigator(`/dashboard/course/${courseId}/module/${moduleId}/edit`)

  const openView = (module: Module) => {
    setSelectedModule(module)
    setViewOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus module ini?")) return
    try {
      await deleteModule(id)
      await fetchModules()
    } catch (err) {
      console.error("Gagal menghapus module", err)
    }
  }

  useEffect(() => {
    fetchModules()
  }, [courseId])

  if (!courseId) return <p className="p-6 text-red-500">Course ID tidak ditemukan</p>
  if (loading) return <p className="p-6">Loading modules...</p>

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Modules List</h2>
        <Button onClick={navCreate} className="flex items-center gap-2">
          <Plus size={16} />
          Create Module
        </Button>
      </div>

      <ModuleTable
        modules={modules}
        onView={openView}
        onEdit={navEditModule}
        onCreateAssignment={navCreateAssignment}
        onDelete={handleDelete}
      />

      {/* View Modal */}
      <ViewModuleModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        moduleData={selectedModule} refreshModule={function (): void {
          throw new Error("Function not implemented.")
        } }      />
    </div>
  )
}

export default ListModules
