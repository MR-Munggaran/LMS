import { useEffect, useState } from 'react';
import { Pencil, Trash2, Eye, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useUsers from '@/hooks/useUsers';
import UserDetailModal from '@/components/Dashboard/UserDetailModal';
import CreateUserModal from '@/components/Dashboard/CreateUserModal'; // Import komponen baru

const UserTable = () => {
  const { 
    users, 
    loading, 
    pagination, 
    fetchUsers, 
    deleteUser, 
    goToPage
  } = useUsers();
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State untuk modal create

  // Fetch users when component mounts and when page changes
  useEffect(() => {
    fetchUsers(pagination.currentPage);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteUser(id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit user with id:', id);
    // navigasi ke form edit
  };

  const handleView = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Fungsi untuk handle setelah user berhasil dibuat
  const handleUserCreated = () => {
    // Data akan otomatis refresh melalui hook useUsers
    console.log('User created successfully');
  };

  const getRoleBadgeVariant = (role: { name: string }) => {
    switch (role.name.toLowerCase()) {
      case 'admin': return 'destructive';
      case 'teacher': return 'default';
      case 'student': return 'secondary';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const current = pagination.currentPage;
    const total = pagination.totalPages;
    
    // Always show first page
    pages.push(1);
    
    // Calculate start and end pages
    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);
    
    // Add ellipsis if needed
    if (start > 2) pages.push('...');
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < total) pages.push(i);
    }
    
    // Add ellipsis if needed
    if (end < total - 1) pages.push('...');
    
    // Always show last page if there is more than 1 page
    if (total > 1) pages.push(total);
    
    return pages;
  };

  if (loading && users.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manajemen User</CardTitle>
              <CardDescription>Kelola data pengguna sistem</CardDescription>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Jenjang</TableHead>
                  <TableHead>Asal Sekolah</TableHead>
                  <TableHead>Tanggal Daftar</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      Belum ada data user
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.jenjang_sekolah || '-'}</TableCell>
                      <TableCell className="max-w-48 truncate" title={user.asal_sekolah}>
                        {user.asal_sekolah || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">{formatDate(user.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleView(user)} className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(user.id)} className="h-8 w-8 p-0">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus user <strong>{user.name}</strong>? 
                                  Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)} className="bg-red-600 hover:bg-red-700">
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {users.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Menampilkan {(pagination.currentPage - 1) * pagination.perPage + 1} -{' '}
                {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} dari{' '}
                {pagination.total} user
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <Button
                    key={index}
                    variant={page === pagination.currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => typeof page === 'number' ? goToPage(page) : null}
                    disabled={typeof page !== 'number'}
                    className={typeof page !== 'number' ? 'cursor-default' : ''}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Halaman {pagination.currentPage} dari {pagination.totalPages}
              </div>
            </div>
          )}
        </CardContent>
        
        {selectedUser && (
          <UserDetailModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Card>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </>
  );
};

export default UserTable;