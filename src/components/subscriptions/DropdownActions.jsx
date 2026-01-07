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
import { AlertDeleteDialog } from "./AlertDeleteDialog";

export const DropdownActions = ({ data, fetchData }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <SubscriptionsEditDialog data={data} fetchData={fetchData} />
          <AlertDeleteDialog
            id={data?._id}
            fetchData={fetchData}
            setOpenDropdown={setOpen}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
