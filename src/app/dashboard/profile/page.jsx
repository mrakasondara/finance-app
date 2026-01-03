"use client";
import { useEffect, useState } from "react";
import { PersonalInformation } from "@/components/profile/personal-information";
import { ResetPassword } from "@/components/profile/reset-password";
import { ShortProfile } from "@/components/profile/short-profile";
import FinanceAPI from "@/lib/FinanceAPI";

export default function Profile() {
  const [initialData, setInitialData] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await FinanceAPI.getProfile();
      setInitialData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="lg:w-1/2 py-5 px-[3rem] flex flex-col gap-5">
      <h1 className="text-xl font-semibold">My Profiles</h1>
      <ShortProfile initialData={initialData} fetchProfile={fetchProfile} />
      <PersonalInformation />
      <ResetPassword />
    </div>
  );
}
