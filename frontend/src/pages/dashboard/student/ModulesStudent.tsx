import { useEffect, useState } from "react"
import { useModules, type Module } from "@/hooks/useModules"
import { useParams } from "react-router-dom"
import { ModuleAccordion } from "@/components/Dashboard/student/ModuleAccordion"

const ModulesStudent = () => {
  const { getModules } = useModules()
  const { courseId } = useParams()
  const [modules, setModules] = useState<Module[]>([])

  useEffect(() => {
    if (!courseId) return
    getModules(Number(courseId)).then(setModules).catch(() => {})
  }, [courseId, getModules])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ModuleAccordion modules={modules} />
    </div>
  )
}

export default ModulesStudent
