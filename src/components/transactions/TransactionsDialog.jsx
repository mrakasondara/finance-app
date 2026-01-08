import { useState } from "react";
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
import { Spinner } from "../ui/spinner";
import FinanceAPI from "@/lib/FinanceAPI";
import { toast } from "sonner";

export const TransactionsDialog = ({ fetchData }) => {
  const [data, setData] = useState({
    purpose: "",
    date: "",
    amount: "",
  });

  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("income");
  const [category, setCategory] = useState("income-bonus");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    const transactionData = {
      ...data,
      transaction_type: transactionType,
      category,
      payment_method: paymentMethod,
    };

    setIsLoading(true);
    const { success, message } = await FinanceAPI.addTransactions(
      transactionData
    );
    setIsLoading(false);

    if (success) {
      toast.success(message);
      setOpen(false);
      fetchData();
    } else {
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-main text-white cursor-pointer absolute top-4 right-5"
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
        <form onSubmit={addTransaction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="purpose">Purpose</label>
              <Input
                id="purpose"
                name="purpose"
                value={data.purpose}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="transaction-type">Transaction Type</label>
              <Select
                defaultValue={transactionType}
                onValueChange={setTransactionType}
                required
              >
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
              <Select
                defaultValue={category}
                onValueChange={setCategory}
                required
              >
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
                          value={transaction.id}
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
              <Input
                id="date"
                name="date"
                type="date"
                value={data.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="amount">Amount</label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="150000"
                value={data.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="payment">Payment Method</label>
              <Select
                defaultValue={paymentMethod}
                onValueChange={setPaymentMethod}
              >
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
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              {isLoading ? <Spinner /> : ""}
              Add Transactions
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
