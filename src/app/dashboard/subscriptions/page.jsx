import { SubscriptionsDialog } from "@/components/subscriptions/SubscriptionsDialog";
import SubscriptionsTable from "@/components/subscriptions/SubscriptionsTable";

export const metadata = {
  title: "Subscriptions Dashboard",
};

export default function Subscriptions() {
  return (
    <div className="py-5 px-[3rem] flex flex-col gap-5 relative">
      <h1 className="text-xl text-black dark:text-[#E0E0E0]">Subscriptions</h1>
      <SubscriptionsTable />
    </div>
  );
}
