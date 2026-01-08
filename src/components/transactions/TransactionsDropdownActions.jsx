import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TransactionsEditDialog } from "./TransactionsEditDialog";
import { TransactionsAlertDeleteDialog } from "./TransactionsAlertDeleteDialog";
// import { AlertDeleteDialog } from "./AlertDeleteDialog";

export const TransactionsDropdownActions = ({ data, fetchData }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <TransactionsEditDialog
            data={data}
            fetchData={fetchData}
            setOpenDropdown={setOpen}
          />
          <TransactionsAlertDeleteDialog
            id={data?._id}
            fetchData={fetchData}
            setOpenDropdown={setOpen}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
