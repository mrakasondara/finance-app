import { CiCalendarDate } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import SubscriptionsTable from "./SubscriptionsTable";

const Subscriptions = () => {
  return (
    <>
      <h1 className="text-xl text-black">Subscriptions</h1>
      <div className="flex flex-col md:flex-row text-black gap-5">
        <div className="order-2 md:order-1 flex w-full md:w-[60%] lg:w-[70%] overflow-x-auto rounded-box border border-base-content/5 bg-white ">
          <SubscriptionsTable />
        </div>

        <div className="md:order-2 order-1 grid w-full md:w-[40%] lg:w-[30%] grid-template-columns-1 md:grid-template-columns-2 gap-5">
          <div className="flex flex-col p-2 w-1/2 mx-auto bg-main/60 text-white rounded-lg">
            <CiCalendarDate className="text-[3rem]" />
            <div className="flex flex-col mt-3">
              <h4 className="font-semibold text-main">Next Billing Date</h4>
              <p>August 17</p>
            </div>
          </div>

          <div className="flex flex-col p-2 w-1/2 mx-auto bg-blue-600/60 text-white rounded-lg">
            <MdAttachMoney className="text-[3rem]" />
            <div className="flex flex-col mt-3">
              <h4 className="font-semibold text-blue-600">Total Payment</h4>
              <p>Rp. 750.000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
