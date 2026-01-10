import TransactionsOverview from "../overview/TransactionsOverview";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { BanknoteArrowDown, Calendar } from "lucide-react";

const Transactions = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 relative">
      <div className="order-2 md:order-1 flex w-full md:w-[60%] lg:w-[70%] items-center justify-center bg-white dark:bg-table">
        <TransactionsOverview />
      </div>

      <div className="md:order-2 order-1 grid w-full md:w-[40%] lg:w-[30%] grid-template-columns-1 md:grid-template-columns-2 gap-5">
        <Card className={"bg-main/60 dark:bg-table"}>
          <CardHeader>
            <Calendar color="#ffffff" />
            <CardTitle className={"text-white"}>Next Billing Date</CardTitle>
            <CardDescription className={"text-white"}>
              August 17
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={"bg-blue-500/60 dark:bg-table"}>
          <CardHeader>
            <BanknoteArrowDown color="#ffffff" />
            <CardTitle className={"text-white"}>Total Payment</CardTitle>
            <CardDescription className={"text-white"}>750.000</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
