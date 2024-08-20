import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import TabBar from "../components/common/TabBar";
import Error from "../components/common/Error";
import '../styles/__root.scss'

function Layout() {
  const router = useLocation();

  const currentPath = router.href;

  const shouldShowHeaderTabBar = !(
    currentPath.includes("/login") 
    || currentPath.includes("/post/CreatePost")
    || currentPath.includes("/chat")
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
