import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModules, type ModuleUpdateData } from "@/hooks/useModules";
import toast from "react-hot-toast";

const EditModule = () => {
  const { moduleId, courseId } = useParams<{ moduleId: string; courseId: string }>();
  const navigate = useNavigate();
  const { getModule, updateModule } = useModules();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil data module lama
  useEffect(() => {
    const fetchData = async () => {
      if (!moduleId) return;
      try {
        const data = await getModule(Number(moduleId));
        setTitle(data.title);
        setContent(data.content || "");
        setVideoUrl(data.video_url || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [moduleId, getModule]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleId || !courseId) return toast.error("ID Module atau Course tidak ditemukan");

    setLoading(true);
    try {
      const payload: ModuleUpdateData = {
        title,
        content,
        video_url: videoUrl,
        document: document || undefined,
      };

      await updateModule(Number(moduleId), payload);
      navigate(`/dashboard/courses/${courseId}/modules`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-[80vh] shadow-lg mb-[10vh]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Edit Module</CardTitle>
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
              <p className="text-sm text-gray-500">
                Upload file baru hanya jika ingin mengganti dokumen.
              </p>
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
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Module"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditModule;
