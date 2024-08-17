import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToHundredThemeProvider } from "./context/themeContext";
import "./styles/global.scss";

import { routeTree } from "./routeTree.gen";
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
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
