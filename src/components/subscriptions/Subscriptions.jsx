import SubscriptionsTable from "./SubscriptionsTable";

const Subscriptions = () => {
  return (
    <div className="flex flex-col md:flex-row text-black dark:text-[#E0E0E0] gap-5 relative">
      <div className="order-2 md:order-1 w-full bg-table ">
        <SubscriptionsTable />
      </div>
    </div>
  );
};

export default Subscriptions;
