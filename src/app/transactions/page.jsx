import { TransactionsDialog } from "@/components/transactions/TransactionDialog";
import TransactionsTable from "@/components/transactions/TransactionsTable";

export const metadata = {
  title: "Transactions",
};

export default function Transactions() {
  return (
    <div className="py-5 px-[3rem] flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-xl text-black dark:text-[#E0E0E0]">Transactions</h1>
        <TransactionsDialog />
      </div>
      <TransactionsTable />
    </div>
  );
}
