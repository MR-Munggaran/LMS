import {
  Menu,
  Home,
  User,
  LogOut,
  LibraryBig,
  BookOpenCheck,
  Newspaper,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useLogout from "@/hooks/useLogout";
import { useAuthContext } from "@/context/AuthContext"; // Import AuthContext

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Gunakan AuthContext

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Menu items untuk setiap role
  const menuItemsByRole = {
    admin: [
      { name: "Home", icon: <Home className="w-4 h-4" />, href: "/dashboard" },
      {
        name: "Courses",
        icon: <LibraryBig className="w-4 h-4" />,
        href: "/dashboard/courses",
      },
      {
        name: "Exam",
        icon: <Newspaper className="w-4 h-4" />,
        href: "/dashboard/exam",
      },
      {
        name: "Users",
        icon: <User className="w-4 h-4" />,
        href: "/dashboard/admin/list/users",
      },
      {
        name: "Profile",
        icon: <User className="w-4 h-4" />,
        href: "/dashboard/profile",
      },
    ],

    teacher: [
      { name: "Home", icon: <Home className="w-4 h-4" />, href: "/dashboard" },
      {
        name: "Courses",
        icon: <LibraryBig className="w-4 h-4" />,
        href: "/dashboard/courses",
      },
      {
        name: "Exam",
        icon: <Newspaper className="w-4 h-4" />,
        href: "/dashboard/exam",
      },
      {
        name: "Profile",
        icon: <User className="w-4 h-4" />,
        href: "/dashboard/profile",
      },
    ],

    student: [
      { name: "Home", icon: <Home className="w-4 h-4" />, href: "/dashboard" },
      {
        name: "Course Student",
        icon: <BookOpenCheck className="w-4 h-4" />,
        href: "/dashboard/student/courses",
      },
      {
        name: "Profile",
        icon: <User className="w-4 h-4" />,
        href: "/dashboard/profile",
      },
    ],
  };

  // Dapatkan menu items berdasarkan role user dari AuthContext
  const menuItems = menuItemsByRole[user?.role?.name as keyof typeof menuItemsByRole] || [];

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:w-64 bg-white border-r shadow-sm flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          Dashboard {user?.role && `- ${user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)}`}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="mb-4 px-3 py-2 text-sm text-gray-600">
            Logged in as: <span className="font-medium">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle>
            <VisuallyHidden>Dashboard Menu</VisuallyHidden>
          </SheetTitle>

          <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
            Dashboard {user?.role && `- ${user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)}`}
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <div className="mb-4 px-3 py-2 text-sm text-gray-600">
              Logged in as: <span className="font-medium">{user?.email}</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;