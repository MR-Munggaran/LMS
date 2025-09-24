import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Admin
import ListCourse from "./dashboard/admin/ListCourse";
import CreateCourse from "./dashboard/admin/CreateCourse";
import ListModules from "./dashboard/admin/ListModules";
import ListResultExam from "./dashboard/admin/ListResultExam";

// Student
import CoursesStudent from "./dashboard/student/CoursesStudent";
import ModulesStudent from "./dashboard/student/ModulesStudent";
import ResultExamStudent from "./dashboard/student/ResultExamStudent";

// General
import Home from "./dashboard/Home";
import Profile from "./dashboard/Profile";
import EditProfile from "./dashboard/EditProfile";
import CreateModule from "./dashboard/admin/CreateModule";
import CreateAssignment from "./dashboard/admin/CreateAssignment";
import EditCourse from "./dashboard/admin/EditCourse";
import EditModule from "./dashboard/admin/EditModule";
import AssignmentDetail from "./dashboard/student/AssigmentDetail";
import ExamSession from "./dashboard/student/ExamSession";
import ExamList from "./dashboard/admin/ExamList";
import { CreateExamForm } from "./dashboard/admin/CreateExam";
import QuestionList from "./dashboard/admin/QuestionList";
import { CreateQuestionForm } from "./dashboard/admin/CreateQuestionForm";
import { StudentExamList } from "./dashboard/student/StudentExamList";
import ExamResultsPage from "./dashboard/admin/ExamResultsPage";
import UserResultsPage from "./dashboard/student/UserResultsPage";
import { EditExamForm } from "./dashboard/admin/EditExamForm";
import { EditQuestionForm } from "./dashboard/admin/EditQuestionForm";
import UserTable from "./dashboard/admin/UserTable";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Profile */}
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="admin/list/users" element={<UserTable />} />

        {/* Admin */}

        {/* Course */}
        <Route path="courses" element={<ListCourse />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/edit/:id" element={<EditCourse />} />

        <Route path="courses/:courseId/modules" element={<ListModules />} />
        <Route path="module/:courseId/modules" element={<CreateModule />} />
        <Route path="course/:courseId/module/:moduleId/edit" element={<EditModule />} />
        
        <Route path="assignment/:moduleId/assignments" element={<CreateAssignment />} />

        <Route path="exam" element={<ExamList />} />
        <Route path=":id/exam/create" element={<CreateExamForm />} />
        <Route path=":examId/exam/edit" element={<EditExamForm />} />
        <Route path="results/exam" element={<ListResultExam />} />
        <Route path="exam/question/:id" element={<QuestionList />} />
        <Route path="exam/question/:id/create" element={<CreateQuestionForm />} />
        <Route path="exam/question/:questionId/edit" element={<EditQuestionForm />} />
        <Route path="exam/result/:examId" element={<ExamResultsPage />} />

        {/* Student */}
        <Route path="student/courses" element={<CoursesStudent />} />
        <Route path="student/courses/:courseId/modules" element={<ModulesStudent />} />
        <Route path="student/assignments/:id" element={<AssignmentDetail />} />
        <Route path="student/results/exam" element={<ResultExamStudent />} />
        <Route path="student/session/exam/:examId/:sessionId" element={<ExamSession />} />
        <Route path="student/exam/:courseId" element={<StudentExamList />} />
        <Route path="student/exam/result/list/:userId" element={<UserResultsPage />} />
      </Routes>
    </DashboardLayout>
  );
}
