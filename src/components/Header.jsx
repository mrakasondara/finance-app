"use client";

import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
  const path = usePathname();
  const isAuth = path?.startsWith("/login") || path?.startsWith("/register");

  return (
    <header
      className={`${isAuth ? "hidden" : "flex"} items-center gap-3 px-5 py-4`}
    >
      <h1 className="text-2xl font-bold text-main mr-auto">Vaulto</h1>

      <div className="flex gap-5 ml-auto items-center">
        <DropdownMenu className="mr-3">
          <DropdownMenuTrigger>
            <Avatar className={"h-10 w-auto"}>
              <AvatarImage src="profile.png" alt="profile" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel className={"font-semibold"}>
                My Account
              </DropdownMenuLabel>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>
                  <User />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Notifications
                <DropdownMenuShortcut>
                  <Bell />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Logout
                <DropdownMenuShortcut>
                  <LogOut />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Menu />
      </div>
    </header>
  );
}
