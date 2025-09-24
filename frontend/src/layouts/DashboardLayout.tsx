import Sidebar from "@/components/Dashboard/Sidebar";
import { useAuthContext } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <h1 className="font-semibold text-lg px-10">Learning Management System</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hi, {user?.name}</span>
            <img
              src={user?.avatar_url}
              alt="avatar"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
