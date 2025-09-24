import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import type { Module } from "@/hooks/useModules"
import { ModuleContent } from "./ModuleContent"
import { ModuleAssignments } from "./ModuleAssignments"

type ModuleItemProps = {
  module: Module
}

export function ModuleItem({ module }: ModuleItemProps) {
  return (
    <AccordionItem value={`module-${module.id}`}>
      <AccordionTrigger className="text-lg font-semibold">
        {module.title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4">
        <ModuleContent module={module} />
        <ModuleAssignments module={module} />
      </AccordionContent>
    </AccordionItem>
  )
}
