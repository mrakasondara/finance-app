import { Landmark, Banknote, Funnel } from "lucide-react";
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

export const SubscriptionsFilter = ({ valueFilter, setFilter, fetchData }) => {
  const onFilterSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const onReset = (e) => {
    e.preventDefault();
    setFilter.setCategoryFilter("");
    setFilter.setPaymentMethodFilter("");
    setFilter.setStatusFilter("");
    fetchData();
  };

  return (
    <form onSubmit={onFilterSubmit}>
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-5">
        <div className="grid">
          <Select
            value={valueFilter.categoryFilter}
            onValueChange={setFilter.setCategoryFilter}
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
            value={valueFilter.paymentMethodFilter}
            onValueChange={setFilter.setPaymentMethodFilter}
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
            value={valueFilter.statusFilter}
            onValueChange={setFilter.setStatusFilter}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
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
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onReset}
            className="cursor-pointer"
            type="cancel"
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="bg-main text-white cursor-pointer"
          >
            <Funnel />
            Filter
          </Button>
        </div>
      </div>
    </form>
  );
};
