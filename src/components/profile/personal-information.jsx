import { Button } from "../ui/button";
import { Edit } from "lucide-react";

export const PersonalInformation = () => {
  return (
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
  );
};
