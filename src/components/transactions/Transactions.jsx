import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import TransactionsTable from "./TransactionsTable";
import { BanknoteArrowDown, Calendar } from "lucide-react";

const Transactions = () => {
  return (
    <>
      <h1 className="text-xl text-black">Transactions</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="order-2 md:order-1 flex w-full md:w-[60%] lg:w-[70%] bg-white rounded-md">
          <TransactionsTable />
        </div>

        <div className="md:order-2 order-1 grid w-full md:w-[40%] lg:w-[30%] grid-template-columns-1 md:grid-template-columns-2 gap-5">
          {/* <div className="flex flex-col p-2 w-full mx-auto bg-main/60 text-white rounded-2xl">
            <Calendar />
            <div className="flex flex-col mt-3">
              <h4 className="font-semibold">Next Billing Date</h4>
              <p>August 17</p>
            </div>
          </div> */}

          <Card className={"bg-main/60"}>
            <CardHeader>
              <Calendar color="#ffffff" />
              <CardTitle className={"text-white"}>Next Billing Date</CardTitle>
              <CardDescription className={"text-white"}>
                August 17
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className={"bg-blue-500/60"}>
            <CardHeader>
              <BanknoteArrowDown color="#ffffff" />
              <CardTitle className={"text-white"}>Total Payment</CardTitle>
              <CardDescription className={"text-white"}>
                750.000
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Transactions;
