import { Wallet } from "lucide-react";
import { Card, CardTitle, CardHeader, CardDescription } from "../ui/card";

const OverviewCard = ({ data }) => {
  let textColor;
  switch (data.title) {
    case "Total Income":
      textColor = "text-green-500";
      break;
    case "Total Expense":
      textColor = "text-red-600";
      break;
    case "Total Saving":
      textColor = "text-main";
      break;
    default:
      textColor = "text-yellow-500";
      break;
  }

  return (
    <Card className="dark:bg-[#444444]/50">
      <CardHeader>
        <div className="flex gap-5">
          <Wallet className={`self-center ${textColor}`} />
          <div className="flex flex-col">
            <CardTitle className={"font-normal"}>{data.title}</CardTitle>
            <CardDescription
              className={"font-semibold text-black dark:text-white mt-1"}
            >
              Rp. {new Intl.NumberFormat(["ban", "id"]).format(data.value)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default OverviewCard;
