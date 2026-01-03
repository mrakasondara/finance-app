import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const ResetPassword = () => {
  return (
    <div className="flex flex-col border dark:border-[#3b3a3aaf] gap-4 rounded-lg p-3">
      <h4 className="text-md font-semibold">Reset Password</h4>
      <form action="">
        <div className="grid gap-4">
          <div className="grid gap-3">
            <label htmlFor="old-password">Old Password</label>
            <Input
              id="old-password"
              name="old-password"
              placeholder="********"
              type="password"
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="new-password">New Password</label>
            <Input
              id="new-password"
              name="new-password"
              placeholder="********"
              type="password"
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
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            type="submit"
            variant="outline"
            className="bg-main text-white"
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};
