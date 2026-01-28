import { ShoppingCart, ClipboardClock, ChartColumnBig } from "lucide-react";
import { Avatar } from "../ui/avatar";

export const FeatureOverview = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 p-4 px-[3rem] gap-x-[5rem] gap-y-20 mt-[10rem] md:mt-[16rem] lg:mt-[17rem] mb-[3rem]">
      <div className="flex flex-col items-center gap-y-1 justify-center">
        <Avatar className="w-[50px] h-[50px] rounded-[50%] bg-main/70 text-white flex items-center justify-center">
          <ShoppingCart />
        </Avatar>
        <h5 className="font-semibold">Flexible Transaction Category</h5>
        <p className="text-sm text-slate-500 text-center">
          Shape your spending your way—categories that flex with your lifestyle.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Avatar className="w-[50px] h-[50px] rounded-[50%] bg-main/70 text-white flex items-center justify-center">
          <ClipboardClock />
        </Avatar>
        <h5 className="font-semibold">Active Subscription Tracking</h5>
        <p className="text-sm text-slate-500 text-center">
          No more surprise charges—stay in control of every subscription.
        </p>
      </div>
      <div className="md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
        <Avatar className="w-[50px] h-[50px] rounded-[50%] bg-main/70 text-white flex items-center justify-center">
          <ChartColumnBig />
        </Avatar>
        <h5 className="font-semibold">Total Payment Monitoring</h5>
        <p className="text-sm text-slate-500 text-center">
          All expenses, one clear view—full transparency for a healthier wallet.
        </p>
      </div>
    </div>
  );
};
