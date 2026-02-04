import Subscriptions from "@/components/subscriptions/Subscriptions";
import Overview from "@/components/overview/Overview";
import Transactions from "@/components/transactions/Transactions";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";
import { TransactionsStatistic } from "@/components/statistic/TransactionsStatistic";

export const metadata = {
  title: "Dashboard Arthavo",
};

export default async function Home() {
  const data = await getServerSession();
  if (!data) {
    redirect("/login", RedirectType.replace);
  }
  return (
    <div className="py-5 px-[3rem] flex flex-col gap-[5rem]">
      <Overview />
      <TransactionsStatistic />
      <Subscriptions />
      <Transactions />
    </div>
  );
}
