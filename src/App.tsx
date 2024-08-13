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
import Home from "./routes";
import Login from "./routes/login";
import Error from "./components/common/Error";
import Layout from "./routes/__root";
import { ToHundredThemeProvider } from "./context/themeContext";
import "./styles/global.scss";

import { routeTree } from './routeTree.gen';
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

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
