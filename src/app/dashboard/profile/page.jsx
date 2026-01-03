import { PersonalInformation } from "@/components/profile/personal-information";
import { ResetPassword } from "@/components/profile/reset-password";
import { ShortProfile } from "@/components/profile/short-profile";
export default function Profile() {
  return (
    <div className="lg:w-1/2 py-5 px-[3rem] flex flex-col gap-5">
      <h1 className="text-xl font-semibold">My Profiles</h1>
      <ShortProfile />
      <PersonalInformation />
      <ResetPassword />
    </div>
  );
}
