import SubscriptionsTable from "./SubscriptionsTable";

const Subscriptions = () => {
  return (
    <>
      <h1 className="text-xl text-black">Subscriptions</h1>
      <div className="flex flex-col md:flex-row text-black gap-5">
        <div className="order-2 md:order-1 flex w-full bg-white rounded-md p-1">
          <SubscriptionsTable />
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
