"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import FinanceAPI from "@/lib/FinanceAPI";
import { toast } from "sonner";

export const PersonalInformation = ({ initialData, fetchProfile }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setUserData({
        first_name: initialData?.first_name ?? "",
        last_name: initialData?.last_name ?? "",
        email: initialData?.email ?? "",
        phone: initialData?.phone ?? "",
      });
    }
  }, [initialData]);

  const updatePersonalInformation = async (e) => {
    e.preventDefault();
    const newProfile = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone: String(userData.phone),
    };
    setIsLoading(true);
    const { success, message } = await FinanceAPI.updatePersonalProfile(
      newProfile
    );
    setIsLoading(false);
    if (success) {
      toast.success(message);
      setOpen(false);
      fetchProfile();
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col border dark:border-[#3b3a3aaf] gap-4 rounded-lg p-3 relative">
      <div className="flex">
        <h4 className="text-md font-semibold">Personal Information</h4>
      </div>

      <table className="text-md table-auto">
        <thead>
          <tr className="text-slate-300 dark:text-white/60">
            <td>First Name</td>
            <td>Last Name</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-slate-600 dark:text-white">
            <td className="w-1/2">{initialData?.first_name ?? ""}</td>
            <td>{initialData?.last_name ?? ""}</td>
          </tr>
        </tbody>
      </table>

      <table className="text-md table-auto">
        <thead>
          <tr className="text-slate-300 dark:text-white/60">
            <td>Email Address</td>
            <td>Phone</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-slate-600 dark:text-white">
            <td className="w-1/2">{initialData?.email ?? ""}</td>
            <td>{initialData?.phone ?? "-"}</td>
          </tr>
        </tbody>
      </table>

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
          <form onSubmit={updatePersonalInformation}>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Change your personal information here. Click save when
                you&apos;re done.
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
                <label htmlFor="email">Email Address</label>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  value={userData.email}
                  id="email"
                  name="email"
                />
              </div>
              <div className="grid gap-3">
                <label htmlFor="phone">Your phone number</label>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  value={userData.phone}
                  id="phone"
                  name="phone"
                  type="number"
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
