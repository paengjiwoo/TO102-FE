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
      <div style={{ padding: '0px 25px'}}>
        <Outlet />
      </div>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;

export const Route = createRootRoute({
  component: Layout,
  notFoundComponent: Error
})
