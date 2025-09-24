import { createContext, useContext, useState, type ReactNode } from "react";

interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role | null;
  jenjang_sekolah: string | null;
  asal_sekolah: string | null;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

// response waktu login
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// tipe context
interface AuthContextType {
  token: string | null;
  user: User | null;
  setAuth: (auth: { token: string; user: User } | null) => void;
}

// context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// hook
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext harus dipakai di dalam <AuthContextProvider>");
  }
  return context;
};

// provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const storedToken = sessionStorage.getItem("token");
  const storedUser = sessionStorage.getItem("user");

  const [token, setToken] = useState<string | null>(storedToken);
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const setAuth = (auth: { token: string; user: User } | null) => {
    if (auth) {
      sessionStorage.setItem("token", auth.token);
      sessionStorage.setItem("user", JSON.stringify(auth.user));
      setToken(auth.token);
      setUser(auth.user);
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
