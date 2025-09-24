import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Assignment } from "@/hooks/useAssignment";

type Props = {
  assignment: Assignment;
};

const AssignmentInfo = ({ assignment }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{assignment.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{assignment.description}</p>
        {assignment.document_path && (
          <Button
            variant="outline"
            onClick={() =>
              window.open(`/storage/${assignment.document_path}`, "_blank")
            }
          >
            Lihat Dokumen
          </Button>
        )}
        {assignment.due_date && (
          <p className="text-sm text-muted-foreground">
            Due: {assignment.due_date}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentInfo;
