import { useState } from 'react';
import { X, Upload, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';
import useUsers from '@/hooks/useUsers';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CreateUserModal = ({ isOpen, onClose, onUserCreated }: CreateUserModalProps) => {
  const { createUser, loading } = useUsers();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    jenjang_sekolah: '',
    asal_sekolah: '',
    role: 'student',
  });
  
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        toast.error('File harus berupa gambar');
        return;
      }

      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 2MB');
        return;
      }

      setAvatar(file);
      
      // Buat preview gambar
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi password match
    if (formData.password !== formData.password_confirmation) {
        toast.error('Password dan konfirmasi password tidak cocok')
      return;
    }

    // Validasi panjang password
    if (formData.password.length < 6) {
        toast.error('Password minimal 6 karakter')
      return;
    }

    const payload = {
      ...formData,
      role: { name: formData.role },
      avatar: avatar
    };

    const result = await createUser(payload);
    
    if (result) {
        toast.success('User berhasil dibuat')
      
      // Reset form
      resetForm();
      onUserCreated();
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      jenjang_sekolah: '',
      asal_sekolah: '',
      role: 'student',
    });
    setAvatar(null);
    setAvatarPreview(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const jenjangOptions = [
    { value: 'SD', label: 'SD' },
    { value: 'SMP', label: 'SMP' },
    { value: 'SMA', label: 'SMA' },
    { value: 'SMK', label: 'SMK' },
  ];

  const roleOptions = [
    { value: 'student', label: 'Siswa' },
    { value: 'teacher', label: 'Guru' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Tambah User Baru
          </DialogTitle>
          <DialogDescription>
            Isi form berikut untuk menambahkan user baru ke sistem
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="space-y-4">
            <Label htmlFor="avatar">Foto Profil (Opsional)</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('avatar')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Pilih Foto
                  </Button>
                  {avatarPreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={removeAvatar}
                      className="text-red-600"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Hapus
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Format: JPG, PNG, GIF (Maks. 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Informasi Dasar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@contoh.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimal 6 karakter"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Konfirmasi Password *</Label>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="Ulangi password"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Informasi Sekolah (khusus student) */}
          {(formData.role === 'student' || formData.role === 'teacher') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jenjang_sekolah">Jenjang Sekolah</Label>
                <Select 
                  value={formData.jenjang_sekolah} 
                  onValueChange={(value) => handleSelectChange('jenjang_sekolah', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenjang" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenjangOptions.map((jenjang) => (
                      <SelectItem key={jenjang.value} value={jenjang.value}>
                        {jenjang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="asal_sekolah">Asal Sekolah</Label>
                <Input
                  id="asal_sekolah"
                  name="asal_sekolah"
                  value={formData.asal_sekolah}
                  onChange={handleInputChange}
                  placeholder="Nama sekolah"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Membuat...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Buat User
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;