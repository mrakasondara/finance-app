import TransactionsTable from "./TransactionsTable";

const Transactions = () => {
  return (
    <>
      <h1 className="text-xl text-black">Transactions</h1>
      <div className="flex">
        <div className="w-full overflow-x-auto rounded-box border border-base-content/5 bg-white text-black">
          <TransactionsTable />
        </div>
      </div>
    </>
  );
};

export default Transactions;
