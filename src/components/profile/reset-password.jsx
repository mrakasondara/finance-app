"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import FinanceAPI from "@/lib/FinanceAPI";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

export const ResetPassword = () => {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password != confirmationPassword) {
      return toast.error("The password confirmation does not match");
    }

    const data = { oldPassword, newPassword: confirmationPassword };
    setIsLoading(true);
    const response = await FinanceAPI.resetPassword(data);
    setIsLoading(false);

    if (response.success) {
      toast.success(response.message);
      setOldPassword("");
      setPassword("");
      setConfirmationPassword("");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex flex-col border dark:border-[#3b3a3aaf] gap-4 rounded-lg p-3">
      <h4 className="text-md font-semibold">Reset Password</h4>
      <form onSubmit={updatePassword}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <label htmlFor="old-password">Old Password</label>
            <Input
              id="old-password"
              name="old-password"
              placeholder="********"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="new-password">New Password</label>
            <Input
              id="new-password"
              name="new-password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="confirm-new-password">
              Confirmation New Password
            </label>
            <Input
              id="confirm-new-password"
              name="confirm-new-password"
              placeholder="********"
              type="password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            type="submit"
            variant="outline"
            className="bg-main text-white"
          >
            {isLoading ? <Spinner /> : ""}
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};
