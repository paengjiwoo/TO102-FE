import { useRouter, Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Error from "../components/common/Error";

function Layout() {
  const router = useRouter();

  const currentPath = router.state.location.pathname;

  const shouldShowHeaderFooter = !currentPath.includes("/login");

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Outlet />
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;

export const Route = createRootRoute({
  component: Layout,
  notFoundComponent: Error
})
