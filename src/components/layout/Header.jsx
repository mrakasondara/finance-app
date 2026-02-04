"use client";

import { usePathname } from "next/navigation";
import { Bell, LogOut, User } from "lucide-react";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { SheetMenu } from "./SheetMenu";
import { ModeToggle } from "../ui/ModeToggle";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Header() {
  const path = usePathname();
  const isAuth = path?.startsWith("/login") || path?.startsWith("/register");
  const { data } = useSession();

  return (
    <header
      className={`${
        isAuth ? "hidden" : "flex"
      } items-center gap-3 px-5 py-4 z-50`}
    >
      <div className="flex gap-1 items-center">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          src="/icons/logo.png"
          className="h-12"
          alt="Arthavo-logo"
        />
        <h1 className="text-2xl font-bold text-main mr-auto">Arthavo</h1>
      </div>

      <div className="flex gap-5 ml-auto items-center justify-items-end">
        <ModeToggle />
        <DropdownMenu className="mr-3">
          <DropdownMenuTrigger>
            <Avatar className={"h-10 w-auto"}>
              <AvatarImage
                src={data?.user.image ?? "/profile/default.jpg"}
                alt="profile"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-table dark:text-white"
            align="start"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className={"font-semibold"}>
                My Account
              </DropdownMenuLabel>
              <Link href={"/dashboard/profile"}>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>
                    <User />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => toast.info("coming soon!")}>
                Notifications
                <DropdownMenuShortcut>
                  <Bell />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
                <DropdownMenuShortcut>
                  <LogOut />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetMenu />
      </div>
    </header>
  );
}
