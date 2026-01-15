"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import FinanceAPI from "@/lib/FinanceAPI";
import { DialogEdit } from "./dialog-edit";

export const ShortProfile = ({ initialData, fetchProfile }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    address: "",
    image_thumb: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (initialData) {
      setUserData({
        first_name: initialData?.first_name ?? "",
        last_name: initialData?.last_name ?? "",
        bio: initialData?.bio ?? "",
        address: initialData?.address ?? "",
        image_thumb: initialData?.image_thumb ?? "/profile/default.jpg",
      });
    }
  }, [initialData]);

  const updateShortProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newProfile = new FormData();
    newProfile.append("first_name", userData.first_name);
    newProfile.append("last_name", userData.last_name);
    newProfile.append("bio", userData.bio);
    newProfile.append("address", userData.address);
    newProfile.append("image_thumb", imagePath[0]);

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

  const props = {
    userData,
    setUserData,
    isLoading,
    setIsLoading,
    updateShortProfile,
    open,
    setOpen,
    setImagePath,
  };

  return (
    <div className="flex border dark:border-[#3b3a3aaf] gap-4 rounded-lg p-3 relative">
      <Avatar className={"h-30 w-auto"}>
        <AvatarImage src={userData?.image_thumb} alt="profile" />
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
      <DialogEdit props={props} />
    </div>
  );
};
