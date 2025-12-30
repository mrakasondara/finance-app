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

export const SubscriptionsDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-main text-white cursor-pointer"
          >
            <Plus />
            Create Subscriptions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Subscriptions</DialogTitle>
            <DialogDescription>
              Add new subscriptions here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="subscriptions">Subscriptions</label>
              <Input
                id="subscriptions"
                name="subscriptions"
                defaultValue="Netflix"
              />
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
            <div className="grid gap-3">
              <label htmlFor="status">Status</label>
              <Select>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Subscriptions</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
