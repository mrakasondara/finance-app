import { Banknote, Landmark } from "lucide-react";
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

const TransactionsTable = () => {
  return (
    <Table>
      <TableCaption>A list of your recent transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className={"font-semibold"}>Purpose</TableHead>
          <TableHead className={"font-semibold"}>Date</TableHead>
          <TableHead className={"font-semibold"}>Amount</TableHead>
          <TableHead className={"font-semibold"}>Payment Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Netflix</TableCell>
          <TableCell>July 19, 20205</TableCell>
          <TableCell>Rp. 65.000</TableCell>
          <TableCell>
            <Banknote className={"text-green-500 text-right"} />
          </TableCell>
        </TableRow>
        <TableRow>
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
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">Rp. 90.000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TransactionsTable;
