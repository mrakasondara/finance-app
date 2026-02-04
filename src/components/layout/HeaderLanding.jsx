"use client";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export const HeaderLanding = () => {
  const path = usePathname();
  const isAuth = path?.startsWith("/login") || path?.startsWith("/register");
  const { data } = useSession();

  return (
    <header
      className={`${
        isAuth ? "hidden" : "absolute top-0 w-full flex justify-between"
      } items-center gap-3 px-5 py-4 z-50`}
    >
      <div className="flex gap-1 items-center">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          src="/icons/logo.png"
          className="h-12"
          alt="arthavo-logo"
        />
        <h1 className="text-2xl font-bold text-white">Arthavo</h1>
      </div>

      <div className=" flex gap-5 ml-auto items-center justify-items-end">
        {data ? (
          <Button
            className="text-white bg-green-500 cursor-pointer border-0 transition hover:backdrop-blur-sm hover:bg-white/30  hover:text-main"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              href={"/login"}
              className="text-white bg-mute transition hover:bg-green-500 hover:text-white cursor-pointer border-0 py-1.5 px-3 rounded-md"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="text-white bg-green-500 cursor-pointer border-0 transition hover:backdrop-blur-sm hover:bg-white/30  hover:text-main py-1.5 px-3 rounded-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
