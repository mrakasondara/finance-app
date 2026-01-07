import {
  BanknoteArrowDown,
  HandCoins,
  Menu,
  Bell,
  User,
  LogOut,
  ChartPie,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-4 w-full md:w-[280px] bg-sheets dark:bg-sheets">
        <SheetHeader className="absolute">
          <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Sidebar Menu of Vaulto
          </SheetDescription>
        </SheetHeader>
        <h1 className="text-2xl font-bold text-main dark:text-white mt-4.5">
          Vaulto
        </h1>
        <div className="mt-3 list-none">
          <NavigationMenu className={"flex-col items-start gap-5"}>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={"/"}
                  className="text-[17px] flex-row items-center gap-2"
                >
                  <ChartPie />
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={"/dashboard/subscriptions"}
                  className="text-[17px] flex-row items-center gap-2"
                >
                  <BanknoteArrowDown />
                  Subscriptions
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={"/dashboard/transactions"}
                  className="text-[17px] flex-row items-center gap-2"
                >
                  <HandCoins />
                  Transactions
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => toast.info("coming soon!")}>
              <NavigationMenuLink asChild>
                <div className="text-[17px] flex-row items-center gap-2 cursor-pointer">
                  <Bell />
                  Notifications
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={"/dashboard/profile"}
                  className="text-[17px] flex-row items-center gap-2"
                >
                  <User />
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="text-[17px] flex-row items-center gap-2 bg-none hover:bg-red-500 hover:text-white cursor-pointer transition"
              >
                <button onClick={() => signOut()}>
                  <LogOut className="hover:text-white" />
                  Logout
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </SheetContent>
    </Sheet>
  );
};
