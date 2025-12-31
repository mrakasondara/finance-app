import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
export default function Profile() {
  return (
    <div className="lg:w-1/2 py-5 px-[3rem] flex flex-col gap-5">
      <h1 className="text-xl font-semibold">My Profile</h1>

      <div className="flex border dark:border-[#3b3a3aaf] gap-4 rounded-lg p-3">
        <Avatar className={"h-30 w-auto"}>
          <AvatarImage src="profile.png" alt="profile" />
        </Avatar>
        <div className="flex flex-col justify-center gap-2">
          <h3 className="text-lg font-semibold">Jane Doe</h3>
          <div className="flex flex-col text-slate-600 dark:text-slate-100/70 text-sm gap-1">
            <p>Frontend Developer</p>
            <p>West Java, Indonesia</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="ml-auto bg-main text-white"
          size="sm"
        >
          <Edit />
          Edit
        </Button>
      </div>

      <div className="flex flex-col border dark:border-[#3b3a3aaf] gap-4 rounded-lg p-3">
        <div className="flex">
          <h4 className="text-md font-semibold">Personal Information</h4>
          <Button
            variant="outline"
            className="ml-auto bg-main text-white"
            size="sm"
          >
            <Edit />
            Edit
          </Button>
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
              <td className="w-1/2">Jane</td>
              <td>Doe</td>
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
              <td className="w-1/2">janedoe@gmail.com</td>
              <td>(+62) 85232131</td>
            </tr>
          </tbody>
        </table>
        <table className="text-md table-auto">
          <thead>
            <tr className="text-slate-300 dark:text-white/60">
              <td>Bio</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-slate-600 dark:text-white">
              <td>Frontend Developer</td>
            </tr>
          </tbody>
        </table>
      </div>

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
    </div>
  );
}
