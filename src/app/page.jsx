import Subscriptions from "@/components/subscriptions/Subscriptions";
import Overview from "@/components/overview/Overview";
import Transactions from "@/components/transactions/Transactions";

export const metadata = {
  title: "Dashboard Vaulto",
};

export default function Home() {
  return (
    <div className="py-5 px-[3rem] flex flex-col gap-[5rem]">
      <Overview />
      <Subscriptions />
      <Transactions />
    </div>
  );
}
