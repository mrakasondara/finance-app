import OverviewCard from "./OverviewCard";
const Overview = () => {
  const itemOverview = [
    {
      title: "Total Income",
      value: "15.000.000",
      textColor: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      title: "Total Expense",
      value: "8.050.000",
      textColor: "text-red-600",
      bgColor: "bg-red-600/20",
    },
    {
      title: "Total Savings",
      value: "6.950.000",
      textColor: "text-main",
      bgColor: "bg-main/20",
    },
    {
      title: "Total Due",
      value: "950.000",
      textColor: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
    },
  ];

  return (
    <>
      <h1 className="text-xl text-black dark:text-[#E0E0E0] font-semibold">
        Overview
      </h1>
      <div className="-mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:px-15">
        {itemOverview.map((item, index) => (
          <OverviewCard {...item} key={index++} />
        ))}
      </div>
    </>
  );
};

export default Overview;
