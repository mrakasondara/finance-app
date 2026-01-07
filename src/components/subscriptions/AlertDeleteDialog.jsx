import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
import FinanceAPI from "@/lib/FinanceAPI";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export const AlertDeleteDialog = ({ id, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteSubscription = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { success, message } = await FinanceAPI.deleteSubscription(id);
    setIsLoading(false);

    if (success) {
      toast.success(message);
      fetchData();
    } else {
      toast.error(message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
          <DropdownMenuShortcut>
            <Trash />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={deleteSubscription}>
            <AlertDialogAction type="submit">
              {isLoading ? <Spinner /> : "Continue"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
