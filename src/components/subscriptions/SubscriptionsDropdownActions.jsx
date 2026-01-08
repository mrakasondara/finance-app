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
import { SubscriptionsEditDialog } from "./SubscriptionsEditDialog";
import { SubscriptionsAlertDeleteDialog } from "./SubscriptionsAlertDeleteDialog";

export const SubscriptionsDropdownActions = ({ data, fetchData }) => {
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
          <SubscriptionsEditDialog
            data={data}
            fetchData={fetchData}
            setOpenDropdown={setOpen}
          />
          <SubscriptionsAlertDeleteDialog
            id={data?._id}
            fetchData={fetchData}
            setOpenDropdown={setOpen}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
