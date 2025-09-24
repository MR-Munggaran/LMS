import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export type Role = {
  id?:string;
  name?:string;
}

export type UserPayload = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  jenjang_sekolah?: string;
  asal_sekolah?: string;
  avatar?: File | null;
  role?: Role;
};

// Type untuk pagination response dari Laravel
type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

type UsersResponse = {
  data: any[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
    perPage: number;
    total: number;
    links: PaginationLinks;
  }>({
    currentPage: 1,
    totalPages: 1,
    perPage: 15,
    total: 0,
    links: {
      first: "",
      last: "",
      prev: null,
      next: null,
    },
  });
  const { token } = useAuthContext();

  // Ambil semua user dengan pagination
  const fetchUsers = async (page: number = 1, search: string = "") => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get<UsersResponse>("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, search },
      });

      setUsers(res.data.data);
      setPagination({
        currentPage: res.data.meta.current_page,
        totalPages: res.data.meta.last_page,
        perPage: res.data.meta.per_page,
        total: res.data.meta.total,
        links: res.data.links,
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Ambil satu user berdasarkan ID
  const fetchUser = async (id: number) => {
    if (!token) return null;
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Tambah user baru
  const createUser = async (payload: UserPayload) => {
    if (!token) return null;
    setLoading(true);
    try {
      let body: any;
      let headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      if (payload.avatar) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(
              key,
              value instanceof File ? value : String(value)
            );
          }
        });
        body = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        body = payload;
        headers["Content-Type"] = "application/json";
      }

      const res = await axios.post("/api/users", body, { headers });
      toast.success("User created successfully!");
      
      // Refresh data ke halaman pertama setelah create
      await fetchUsers(1);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to create user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (id: number, payload: UserPayload) => {
    if (!token) return null;
    setLoading(true);

    try {
      let body: any;
      let headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      if (payload.avatar) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(
              key,
              value instanceof File ? value : String(value)
            );
          }
        });
        body = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        body = payload;
        headers["Content-Type"] = "application/json";
      }

      const res = await axios.post(`/api/users/${id}?_method=PUT`, body, {
        headers,
      });
      toast.success("User updated successfully!");
      
      // Refresh data di halaman saat ini setelah update
      await fetchUsers(pagination.currentPage);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to update user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Hapus user
  const deleteUser = async (id: number) => {
    if (!token) return false;
    setLoading(true);
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully!");
      
      // Jika ini adalah item terakhir di halaman dan bukan halaman pertama,
      // kembali ke halaman sebelumnya
      const currentPage = pagination.currentPage;
      const isLastItemOnPage = users.length === 1;
      const isNotFirstPage = currentPage > 1;
      
      if (isLastItemOnPage && isNotFirstPage) {
        await fetchUsers(currentPage - 1);
      } else {
        await fetchUsers(currentPage);
      }
      
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to delete user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk navigasi halaman
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchUsers(page);
    }
  };

  // Fungsi untuk pencarian
  const searchUsers = (searchTerm: string) => {
    fetchUsers(1, searchTerm);
  };

  useEffect(() => {
    if (token) {
      void fetchUsers(1);
    }
  }, [token]);

  return {
    loading,
    users,
    pagination,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    goToPage,
    searchUsers,
  };
};

export default useUsers;