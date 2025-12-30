"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const SubscriptionsTable = () => {
  const path = usePathname();
  const isOverview = !path?.startsWith("/subscriptions");

  return (
    <Table className="bg-table">
      {isOverview ? (
        <TableCaption>
          A list of your recent subscriptions.{" "}
          <Link href={"/subscriptions"} className="underline">
            See your all subscriptions
          </Link>
        </TableCaption>
      ) : (
        ""
      )}

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-black dark:text-white font-semibold">
            Subscription
          </TableHead>
          <TableHead className={"text-black dark:text-white font-semibold"}>
            Due Date
          </TableHead>
          <TableHead className={"text-black dark:text-white font-semibold"}>
            Amount
          </TableHead>
          <TableHead className={"text-black dark:text-white font-semibold"}>
            Payment Method
          </TableHead>
          <TableHead className="text-right text-black dark:text-white font-semibold">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="text-black dark:text-white">
          <TableCell>Transportation</TableCell>
          <TableCell>July 8, 2025</TableCell>
          <TableCell>Rp. 65.000</TableCell>
          <TableCell>Cash</TableCell>
          <TableCell className="text-right">
            <Badge className={"bg-green-500/50 text-black dark:text-white"}>
              Paid
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow className="text-black dark:text-white">
          <TableCell>Netflix</TableCell>
          <TableCell>July 18, 2025</TableCell>
          <TableCell>Rp. 25.000</TableCell>
          <TableCell>Transfer</TableCell>
          <TableCell className="text-right">
            <Badge className={"bg-red-500/50 text-black dark:text-white"}>
              Unpaid
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="font-semibold text-black dark:text-white">
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">Rp. 90.000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SubscriptionsTable;
