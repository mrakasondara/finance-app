"use client";
import { Banknote, Bus, Film, Landmark } from "lucide-react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
} from "../ui/table";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TransactionsTable = () => {
  const path = usePathname();
  const isOverview = !path?.startsWith("/transactions");
  return (
    <Table className="bg-table">
      {isOverview ? (
        <TableCaption>
          A list of your recent transactions.{" "}
          <Link href={"/transactions"} className="underline">
            See your all transactions
          </Link>
        </TableCaption>
      ) : (
        ""
      )}

      <TableHeader>
        <TableRow>
          <TableHead className="text-black dark:text-white font-semibold">
            Category
          </TableHead>
          <TableHead className="text-black dark:text-white font-semibold">
            Purpose
          </TableHead>
          <TableHead className="text-black dark:text-white font-semibold">
            Date
          </TableHead>
          <TableHead className="text-black dark:text-white font-semibold">
            Amount
          </TableHead>
          <TableHead className="text-black dark:text-white font-semibold">
            Payment Method
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className={"text-black dark:text-white"}>
          <TableCell>
            <Film />
          </TableCell>
          <TableCell>Netflix</TableCell>
          <TableCell>July 19, 20205</TableCell>
          <TableCell>Rp. 65.000</TableCell>
          <TableCell>
            <Banknote className={"text-green-500 text-right"} />
          </TableCell>
        </TableRow>
        <TableRow className={"text-black dark:text-white"}>
          <TableCell>
            <Bus />
          </TableCell>
          <TableCell>Transportation</TableCell>
          <TableCell>July 8, 20205</TableCell>
          <TableCell>Rp. 25.000</TableCell>
          <TableCell>
            <Landmark className={"text-blue-500 text-right"} />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className={"font-semibold"}>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">Rp. 90.000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TransactionsTable;
