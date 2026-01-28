"use client";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const path = usePathname();
  const isAuth = path?.startsWith("/login") || path?.startsWith("/register");
  return (
    <footer
      className={`${
        isAuth ? "hidden" : "flex justify-between"
      } items-center gap-3 px-5 py-2`}
    >
      <div className="flex gap-1 items-center justify-center">
        <img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          src="/icons/logo.png"
          className="h-12"
          alt="vaulto-logo"
        />
        <h1 className="text-2xl font-bold text-main">Vaulto</h1>
      </div>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Vaulto - Finance App. All right
        reserved
      </p>
    </footer>
  );
};
