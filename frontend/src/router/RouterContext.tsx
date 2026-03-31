import { createContext, useContext, useState, type ReactNode } from "react";

interface RouterContextType {
  pathname: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: "/",
  navigate: () => {},
});

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [pathname, setPathname] = useState("/");
  const navigate = (path: string) => setPathname(path);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);