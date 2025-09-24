import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModules, type ModuleCreateData } from "@/hooks/useModules";
import toast from "react-hot-toast";

const CreateModule = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { createModule } = useModules();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return toast.error("Course ID tidak ditemukan");

    setLoading(true);
    try {
      const payload: ModuleCreateData = {
        title,
        content,
        video_url: videoUrl,
        document: document || undefined,
      };

      await createModule(Number(courseId), payload);
      navigate(`/dashboard/courses/${courseId}/modules`);
    } catch (err) {
      console.error(err);
      // Error toast sudah ditangani di hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-[80vh] shadow-lg mb-[10vh]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Module</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter module title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Type module content here..."
                className="w-full h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="document">Document (PDF/DOC/DOCX/PPT/PPTX/XLS/XLSX)</Label>
              <Input
                type="file"
                id="document"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                type="url"
                id="videoUrl"
                placeholder="Enter video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" variant="success" disabled={loading}>
                {loading ? "Saving..." : "Create Module"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateModule;