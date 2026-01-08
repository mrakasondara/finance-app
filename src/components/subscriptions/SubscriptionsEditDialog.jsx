import { useState } from "react";
import { Banknote, Landmark, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { transactionCategories } from "@/lib/transaction-categories";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import FinanceAPI from "@/lib/FinanceAPI";
import { toast } from "sonner";

export function SubscriptionsEditDialog({ data, fetchData, setOpenDropdown }) {
  const [newData, setNewData] = useState({
    subscription: data?.subscription ?? "",
    due_date: data?.due_date ?? "",
    amount: data?.amount ?? "",
  });
  const [category, setCategory] = useState(data?.category ?? "");
  const [paymentMethod, setPaymentMethod] = useState(
    data?.payment_method ?? ""
  );
  const [status, setStatus] = useState(data?.status ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editSubscription = async (e) => {
    e.preventDefault();
    setOpenDropdown(false);
    const subscriptionData = {
      ...newData,
      category,
      payment_method: paymentMethod,
      status,
    };

    setIsLoading(true);
    const id = data._id;
    const { success, message } = await FinanceAPI.updateSubscription(
      subscriptionData,
      id
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
          <DropdownMenuShortcut>
            <SquarePen />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Subscription</DialogTitle>
          <DialogDescription>
            Change your subscription data here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={editSubscription}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="subscription">Subscription</label>
              <Input
                id="subscription"
                name="subscription"
                placeholder="Netflix"
                value={newData.subscription}
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
                value={new Date(newData?.due_date).toISOString().slice(0, 10)}
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
                value={newData?.amount}
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
            <Button type="submit" className="cursor-pointer">
              {isLoading ? <Spinner /> : ""}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
