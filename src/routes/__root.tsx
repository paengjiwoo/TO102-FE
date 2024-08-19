import { useRouter, Outlet, createRootRoute } from "@tanstack/react-router";
import TabBar from "../components/common/TabBar";
import Error from "../components/common/Error";
import '../styles/__root.scss'

function Layout() {
  const router = useRouter();

  const currentPath = router.state.location.pathname;

  const shouldShowHeaderTabBar = !(
    currentPath.includes("/login") || currentPath.includes("/post/CreatePost")
  );

  return (
    <>
      <div className="web">
        <div className="app">
          <div className="app__page">
            <Outlet />
          </div>
          <div className="app__tabbar">
            {shouldShowHeaderTabBar && <TabBar />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;

export const Route = createRootRoute({
  component: Layout,
  notFoundComponent: Error,
});
