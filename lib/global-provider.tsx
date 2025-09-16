import { getCurrentUser, login, logout } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import React, { createContext, ReactNode, useContext } from "react";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: () => Promise<void>;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite<User>({
    fn: getCurrentUser,
  });

  const isLogged = !!user;

  const loginUser = async () => {
    await login();
    await refetch();
  };

  const logoutUser = async () => {
    await logout();
    await refetch();
  };

  // ✅ No redirects here — just context
  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
