import { Accordion } from "@/components/ui/accordion"
import type { Module } from "@/hooks/useModules"
import { ModuleItem } from "./ModuleItem"

type ModuleAccordionProps = {
  modules: Module[]
}

export function ModuleAccordion({ modules }: ModuleAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {modules.map((module) => (
        <ModuleItem key={module.id} module={module} />
      ))}
    </Accordion>
  )
}
