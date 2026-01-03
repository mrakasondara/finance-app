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

export const ShortProfile = () => {
  const [profile, setProfile] = useState(null);
  const [shortName, setShortName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await FinanceAPI.getProfile();
      setProfile(data);
      setShortName(data?.short_name ?? "");
      setLastName(data?.last_name ?? "");
      setBio(data?.bio ?? "");
      setAddress(data?.address ?? "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateShortProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newProfile = {
      short_name: shortName,
      last_name: lastName,
      bio,
      address,
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
          {profile?.short_name ? profile.short_name : "-"}{" "}
          {profile?.last_name ? profile.last_name : ""}
        </h3>
        <div className="flex flex-col text-slate-600 dark:text-slate-100/70 text-sm gap-1">
          <p>{profile?.bio ? profile.bio : "Add your bio"}</p>
          <p>{profile?.address ? profile.address : "Add your address"}</p>
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
                    onChange={(e) => setShortName(e.target.value)}
                    value={shortName}
                    id="first-name"
                    name="first-name"
                  />
                </div>
                <div className="grid w-1/2 gap-3">
                  <label htmlFor="last-name">Last Name</label>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    id="last-name"
                    name="last-name"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <label htmlFor="bio">Your bio</label>
                <Input
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  id="bio"
                  name="bio"
                />
              </div>
              <div className="grid gap-3">
                <label htmlFor="adress">Your adress</label>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
