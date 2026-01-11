import {
  Landmark,
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Funnel,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { transactionCategories } from "@/lib/transaction-categories";

export const TransactionsFilter = () => {
  return (
    <form>
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-5">
        <div className="grid">
          <Select
            defaultValue=""
            // onValueChange={setTransactionType}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {transactionCategories.map((transaction) => {
                  const Icon = transaction.icon;
                  return (
                    <SelectItem value={transaction.id} key={transaction.name}>
                      <Icon /> {transaction.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid">
          <Select
            defaultValue=""
            // onValueChange={setTransactionType}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Method</SelectLabel>
                <SelectItem value="bank">
                  <Landmark /> Bank
                </SelectItem>
                <SelectItem value="cash">
                  <Banknote /> Cash
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid">
          <Select
            defaultValue=""
            // onValueChange={setTransactionType}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by transaction type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Transaction Type</SelectLabel>
                <SelectItem value="income" className="text-green-500">
                  <BanknoteArrowUp className="text-green-500" /> Income
                </SelectItem>
                <SelectItem value="expense" className="text-red-500">
                  <BanknoteArrowDown className="text-red-500" /> Expense
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          variant="outline"
          className="bg-main text-white cursor-pointer"
        >
          <Funnel />
          Filter
        </Button>
      </div>
    </form>
  );
};
