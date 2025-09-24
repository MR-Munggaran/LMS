import { useState } from "react";
import { useAssignments } from "@/hooks/useAssignment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const CreateAssignment = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate()
  const { createAssignment } = useAssignments();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Kalau due_date -> ubah "2025-09-16T21:30" jadi "2025-09-16 21:30"
    if (name === "due_date" && value) {
      formattedValue = value.replace("T", " ");
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleId) return;
    
    setIsSubmitting(true);
    try {
      // Create FormData object
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("due_date", formData.due_date);
      
      if (documentFile) {
        submitData.append("document", documentFile);
      }

      await createAssignment(parseInt(moduleId), submitData);
      
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        due_date: "",
      });
      setDocumentFile(null);
      
      // Reset file input
      const fileInput = document.getElementById("document") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      console.error("Error creating assignment:", error);
    } finally {
      setIsSubmitting(false);
      navigate(-1)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-2">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid w-full gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Enter assignment title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Type assignment description here..."
                value={formData.description}
                onChange={handleChange}
                className="w-full h-32"
              />
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="document">Document File (Optional)</Label>
              <Input
                type="file"
                id="document"
                name="document"
                onChange={handleFileChange}
                className="w-full"
                accept=".pdf,.doc,.docx,.txt"
              />
              {documentFile && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected file: {documentFile.name}
                </p>
              )}
            </div>
            
            <div className="grid w-full gap-2">
              <Label htmlFor="due_date">Due Date (Optional)</Label>
              <Input
                type="datetime-local"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                variant="success"
              >
                {isSubmitting ? "Creating..." : "Create Assignment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAssignment;