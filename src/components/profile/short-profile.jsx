"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import FinanceAPI from "@/lib/FinanceAPI";
import { Spinner } from "../ui/spinner";

export const ShortProfile = ({ initialData, fetchProfile }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setUserData({
        first_name: initialData?.first_name ?? "",
        last_name: initialData?.last_name ?? "",
        bio: initialData?.bio ?? "",
        address: initialData?.address ?? "",
      });
    }
  }, [initialData]);

  const updateShortProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newProfile = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      bio: userData.bio,
      address: userData.address,
    };

    const response = await FinanceAPI.updateShortProfile(newProfile);
    setIsLoading(false);
    if (response.success) {
      toast.success(response.message);
      setOpen(false);
      fetchProfile();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex border dark:border-[#3b3a3aaf] gap-4 rounded-lg p-3 relative">
      <Avatar className={"h-30 w-auto"}>
        <AvatarImage src="/profile/profile.png" alt="profile" />
      </Avatar>
      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-lg font-semibold">
          {initialData?.first_name ? initialData.first_name : "-"}{" "}
          {initialData?.last_name ?? ""}
        </h3>
        <div className="flex flex-col text-slate-600 dark:text-slate-100/70 text-sm gap-1">
          <p>{initialData?.bio ? initialData.bio : "Add your bio"}</p>
          <p>
            {initialData?.address ? initialData.address : "Add your address"}
          </p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="absolute right-3 bg-main text-white cursor-pointer"
            size="sm"
          >
            <Edit />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <form onSubmit={updateShortProfile}>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Change your short profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mt-2">
              <div className="flex gap-3">
                <div className="grid w-1/2 gap-3">
                  <label htmlFor="first-name">First Name</label>
                  <Input
                    onChange={(e) =>
                      setUserData({ ...userData, first_name: e.target.value })
                    }
                    value={userData.first_name}
                    id="first-name"
                    name="first-name"
                  />
                </div>
                <div className="grid w-1/2 gap-3">
                  <label htmlFor="last-name">Last Name</label>
                  <Input
                    onChange={(e) =>
                      setUserData({ ...userData, last_name: e.target.value })
                    }
                    value={userData.last_name}
                    id="last-name"
                    name="last-name"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <label htmlFor="bio">Your bio</label>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                  value={userData.bio}
                  id="bio"
                  name="bio"
                />
              </div>
              <div className="grid gap-3">
                <label htmlFor="adress">Your adress</label>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  value={userData.address}
                  id="adress"
                  name="adress"
                />
              </div>
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isLoading ? <Spinner /> : ""}
                Update Profile
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
