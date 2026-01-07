"use client";
import { Banknote, Landmark, Plus } from "lucide-react";
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
import { useState } from "react";
import FinanceAPI from "@/lib/FinanceAPI";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

export const SubscriptionsDialog = ({ fetchData }) => {
  const [data, setData] = useState({
    subscription: "",
    due_date: "",
    amount: 0,
  });
  const [category, setCategory] = useState("income-salary");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [status, setStatus] = useState("paid");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSubscription = async (e) => {
    e.preventDefault();
    const subscriptionData = {
      ...data,
      category,
      payment_method: paymentMethod,
      status,
    };
    setIsLoading(true);
    const { success, message } = await FinanceAPI.addSubscription(
      subscriptionData
    );
    setIsLoading(false);
    if (success) {
      toast.success(message);
      setOpen(false);
      await fetchData();
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
          Create Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Subscription</DialogTitle>
          <DialogDescription>
            Add new subscription here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addSubscription}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="subscription">Subscription</label>
              <Input
                id="subscription"
                name="subscription"
                placeholder="Netflix"
                value={data.subscription}
                onChange={handleChange}
                required
              />
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
                        <SelectItem value={transaction.id} key={transaction.id}>
                          <Icon /> {transaction.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <label htmlFor="due_date">Due Date</label>
              <Input
                id="due_date"
                name="due_date"
                type="date"
                value={data.due_date}
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
                required
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
            <div className="grid gap-3">
              <label htmlFor="status">Status</label>
              <Select defaultValue={status} onValueChange={setStatus} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Spinner /> : ""}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
