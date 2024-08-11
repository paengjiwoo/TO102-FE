import React from "react";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  RootRoute,
  Route,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./components/common/Error";
import Layout from "./layout/layout";
import { ToHundredThemeProvider } from "./context/themeContext";
import "./styles/global.scss";

const queryClient = new QueryClient();

const rootRoute: RootRoute = createRootRoute({
  component: Layout,
  errorComponent: Error,
});

const homeRoute: any = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute: any = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const router: any = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, loginRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: any;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToHundredThemeProvider>
        <RouterProvider router={router} />
      </ToHundredThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
