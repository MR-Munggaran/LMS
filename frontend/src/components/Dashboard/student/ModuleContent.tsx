import { Button } from "@/components/ui/button"
import { FileText, Video } from "lucide-react"
import type { Module } from "@/hooks/useModules"

type ModuleContentProps = {
  module: Module
}

export function ModuleContent({ module }: ModuleContentProps) {
  return (
    <div className="ml-4">
      <p className="font-semibold">{module.content}</p>
      <p className="font-medium">Content</p>
      <div className="flex flex-col gap-2 mt-2">
        {module.document_url && (
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.open(module.document_url!, "_blank")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Lecture Notes
          </Button>
        )}
        {module.video_url && (
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.open(module.video_url!, "_blank")}
          >
            <Video className="mr-2 h-4 w-4" />
            Video Lecture
          </Button>
        )}
      </div>
    </div>
  )
}
