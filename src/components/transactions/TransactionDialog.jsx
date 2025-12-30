import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Landmark,
  Plus,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { transactionCategories } from "@/lib/transaction-categories";

export const TransactionsDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-main text-white cursor-pointer"
          >
            <Plus />
            Create Transactions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Transactions</DialogTitle>
            <DialogDescription>
              Add new transactions here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="purpose">Purpose</label>
              <Input id="purpose" name="purpose" defaultValue="Health" />
            </div>
            <div className="grid gap-3">
              <label htmlFor="transaction-type">Transaction Type</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Transaction Type</SelectLabel>
                    <SelectItem value="income">
                      <BanknoteArrowUp /> Income
                    </SelectItem>
                    <SelectItem value="expense">
                      <BanknoteArrowDown /> Expense
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <label htmlFor="category">Category</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {transactionCategories.map((transaction) => {
                      const Icon = transaction.icon;
                      return (
                        <SelectItem
                          value={transaction.name}
                          key={transaction.name}
                        >
                          <Icon /> {transaction.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <label htmlFor="date">Date</label>
              <Input id="date" name="date" type="date" />
            </div>
            <div className="grid gap-3">
              <label htmlFor="amount">Amount</label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="150000"
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="payment">Payment Method</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Payment Method</SelectLabel>
                    <SelectItem value="cash">
                      <Banknote /> Cash
                    </SelectItem>
                    <SelectItem value="bank">
                      <Landmark /> Bank
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Transactions</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
