import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useCourse, type Course } from "@/hooks/useCourse";
import { useExam, type PaginatedExams } from "@/hooks/useExam";
import { ExamTable } from "@/components/Dashboard/ExamTable"; // komponen tabel exam

const ExamList = () => {
  const navigate = useNavigate();
  const { getMyCourses } = useCourse();
  const { getExams, deleteExam } = useExam();

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const [examData, setExamData] = useState<PaginatedExams | null>(null);

  useEffect(() => {
    getMyCourses().then((res) => {
      if (res?.data) setCourses(res.data);
    });
  }, [getMyCourses]);

  useEffect(() => {
    if (selectedCourse) {
      getExams(Number(selectedCourse), 1).then(setExamData);
    }
  }, [selectedCourse, getExams]);

  const handleDelete = async (id: number) => {
    try {
      await deleteExam(id);
      if (selectedCourse) {
        const refreshed = await getExams(Number(selectedCourse), 1);
        setExamData(refreshed);
      }
    } catch (err) {
      console.error("Failed to delete exam", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Pilih Course */}
      <div className="flex justify-between gap-4">
        <div className="w-64">
          <Select onValueChange={(val) => setSelectedCourse(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={String(course.id)}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tombol Create Exam */}
        {selectedCourse && (
          <div className="">
          <Button
            className=""
            onClick={() =>
              navigate(`/dashboard/${selectedCourse}/exam/create`)
            }
          >
            Create Exam
          </Button>
          </div>
        )}
      </div>

      {/* Tabel Exam atau pesan kosong */}
      {selectedCourse && examData ? (
        examData.data.length > 0 ? (
          <ExamTable
            exams={examData.data}
            meta={examData.meta}
            onPageChange={(page) =>
              getExams(Number(selectedCourse), page).then(setExamData)
            }
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center text-gray-500 py-6">
            Tidak ada data exam untuk course ini.
          </div>
        )
      ) : null}
    </div>
  );
};

export default ExamList;
