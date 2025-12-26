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
  return (
    <Table>
      <TableCaption>A list of your recent subscriptions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-semibold">
            Subscription
          </TableHead>
          <TableHead className={"font-semibold"}>Due Date</TableHead>
          <TableHead className={"font-semibold"}>Amount</TableHead>
          <TableHead className={"font-semibold"}>Payment Method</TableHead>
          <TableHead className="text-right font-semibold">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Transportation</TableCell>
          <TableCell>July 8, 2025</TableCell>
          <TableCell>Rp. 65.000</TableCell>
          <TableCell>Cash</TableCell>
          <TableCell className="text-right">
            <Badge className={"bg-green-500/50"}>Paid</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Netflix</TableCell>
          <TableCell>July 18, 2025</TableCell>
          <TableCell>Rp. 25.000</TableCell>
          <TableCell>Transfer</TableCell>
          <TableCell className="text-right">
            <Badge className={"bg-red-500/50"}>Unpaid</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="font-semibold">
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">Rp. 90.000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SubscriptionsTable;
