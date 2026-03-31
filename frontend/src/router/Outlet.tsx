import { useRouter } from "./RouterContext";
import HomePage from "../pages/Home";
import ApiPage from "../pages/Api";

const routes: Record<string, React.ReactNode> = {
  "/":    <HomePage />,
  "/api": <ApiPage />,
};

const Outlet = () => {
  const { pathname } = useRouter();
  return <>{routes[pathname] ?? <div>404 — Page not found</div>}</>;
};

export default Outlet;