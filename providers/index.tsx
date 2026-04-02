import React from "react";
import { ThemeProvider } from "./theme-provider";
import QueryProvider from "./query-provider";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
    // attribute="class"
    // defaultTheme="system"
    // enableSystem
    // disableTransitionOnChange
    >
      <QueryProvider>{children}</QueryProvider>
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  );
};

export default Providers;
