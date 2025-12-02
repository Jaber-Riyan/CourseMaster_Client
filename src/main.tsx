import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors={true} />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
