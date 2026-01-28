import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {children}
      </ThemeProvider>
    </>
  );
}
