import { User, Mail, School, Calendar, Shield, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UserDetailModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailModal = ({ user, isOpen, onClose }: UserDetailModalProps) => {
  const getRoleBadgeVariant = (role: { name: string }) => {
    switch (role.name.toLowerCase()) {
      case 'admin':
        return 'destructive';
      case 'teacher':
        return 'default';
      case 'student':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail User</DialogTitle>
          <DialogDescription>
            Informasi lengkap mengenai user <strong>{user.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Nama:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Role:</span>
            <Badge variant={getRoleBadgeVariant(user.role)}>
              {user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Jenjang:</span>
            <span>{user.jenjang_sekolah || '-'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Asal Sekolah:</span>
            <span>{user.asal_sekolah || '-'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Tanggal Daftar:</span>
            <span>{formatDate(user.created_at)}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
