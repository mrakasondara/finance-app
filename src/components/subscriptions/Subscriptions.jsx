import SubscriptionsTable from "./SubscriptionsTable";

const Subscriptions = () => {
  return (
    <div className="flex flex-col md:flex-row text-black gap-5">
      <div className="order-2 md:order-1 flex w-full bg-table">
        <SubscriptionsTable />
      </div>
    </div>
  );
};

export default Subscriptions;
