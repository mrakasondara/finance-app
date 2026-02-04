"use client";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const path = usePathname();
  const isAuth = path?.startsWith("/login") || path?.startsWith("/register");
  return (
    <footer
      className={`${
        isAuth ? "hidden" : "flex justify-between"
      } items-center gap-3 px-5 py-2 mt-[5rem] lg:mt-[2rem]`}
    >
      <div className="flex gap-1 items-center justify-center">
        <img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          src="/icons/logo.png"
          className="h-12"
          alt="arthavo-logo"
        />
        <h1 className="text-2xl font-bold text-main">Arthavo</h1>
      </div>
      <p className="text-[10px] md:text-sm">
        &copy; {new Date().getFullYear()} Arthavo - Finance App. {""}
        <span className="hidden lg:inline-block">All right reserved</span>
      </p>
    </footer>
  );
};
