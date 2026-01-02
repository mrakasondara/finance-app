import Subscriptions from "@/components/subscriptions/Subscriptions";
import Overview from "@/components/overview/Overview";
import Transactions from "@/components/transactions/Transactions";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard Vaulto",
};

export default async function Home() {
  const data = await getServerSession();
  if (!data) {
    redirect("/login", RedirectType.replace);
  }
  return (
    <div className="py-5 px-[3rem] flex flex-col gap-[5rem]">
      <Overview />
      <Subscriptions />
      <Transactions />
    </div>
  );
}
