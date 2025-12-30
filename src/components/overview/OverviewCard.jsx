import { Wallet } from "lucide-react";
import { Card, CardTitle, CardHeader, CardDescription } from "../ui/card";

const OverviewCard = ({ title, value, textColor, bgColor }) => {
  return (
    <Card className="dark:bg-[#444444]/50">
      <CardHeader>
        <div className="flex gap-5">
          <Wallet className={`self-center ${textColor}`} />
          <div className="flex flex-col">
            <CardTitle className={"font-normal"}>{title}</CardTitle>
            <CardDescription
              className={"font-semibold text-black dark:text-white mt-1"}
            >
              Rp. {value}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default OverviewCard;
