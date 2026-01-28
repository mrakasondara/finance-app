export const Features = () => {
  return (
    <div className="flex flex-col justify-center gap-4 mb-[3rem] py-[3rem] px-[3rem] bg-green-100/70">
      <span className="w-[100px] text-main backdrop-blur-lg backdrop-brightness-150 bg-main/30 py-1.4 text-center rounded-full font-semibold mx-auto text-[15px]">
        Features
      </span>
      <h5 className="text-2xl mx-auto text-[#090b0f] font-bold">
        Empowering Financial Clarity
      </h5>
      <p className="-mt-3 mx-auto text-slate-400 text-sm text-center">
        Streamlined tools to help you manage, monitor, and optimize your
        finances with confidence.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-[2rem] gap-3">
        <div className="px-5 py-[2rem] flex flex-col gap-2 bg-white rounded-4xl">
          <h6 className="text-xl font-semibold">
            Smarter tracking, clearer insights.
          </h6>
          <p className="text-sm text-slate-400">
            Automatically categorize your financial data by transaction type and
            status, giving you real-time clarity on where your money goes.
            Whether it’s pending, completed, or recurring, every transaction is
            neatly organized for effortless monitoring.
          </p>
          <img
            src="/landing-page/transactions.png"
            alt="transaction"
            className="w-full lg:w-3/4 lg:mx-auto mt-3"
          />
        </div>
        <div className="px-5 py-[2rem] flex flex-col gap-2 bg-white rounded-4xl">
          <h6 className="text-xl font-semibold">
            Track your spending, anytime.
          </h6>
          <p className="text-sm text-slate-400">
            Visualize your financial activity with detailed statistics by month,
            week, and day. Instantly see your transaction patterns with
            easy-to-read charts.
          </p>
          {/* <img
            src="/landing-page/transactions.png"
            alt="transaction"
            className="w-full lg:w-3/4 lg:mx-auto mt-3"
          /> */}
        </div>
      </div>
    </div>
  );
};
