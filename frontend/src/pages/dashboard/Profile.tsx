import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useProfile from "@/hooks/useProfile"; // pastikan path sesuai
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigator = useNavigate();
  const { user, loading } = useProfile();

  const navEdit = (): void => {
    navigator("/dashboard/profile/edit");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        Failed to load profile
      </div>
    );
  }else{
    
  }

  return (
    <div className="p-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar_url} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md">
                {user?.role?.name|| "User"}
              </span>
            </div>
          </div>

          {/* tambahan info sekolah */}
          {user?.jenjang_sekolah && (
            <p className="text-sm text-gray-600">
              Jenjang: {user?.jenjang_sekolah}
            </p>
          )}
          {user?.asal_sekolah && (
            <p className="text-sm text-gray-600">
              Asal Sekolah: {user?.asal_sekolah}
            </p>
          )}

          <Button className="w-full mt-4" onClick={navEdit}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
