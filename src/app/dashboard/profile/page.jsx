"use client";
import { useEffect, useState } from "react";
import { PersonalInformation } from "@/components/profile/personal-information";
import { ResetPassword } from "@/components/profile/reset-password";
import { ShortProfile } from "@/components/profile/short-profile";
import FinanceAPI from "@/lib/FinanceAPI";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Profile() {
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await FinanceAPI.getProfile();
      setInitialData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="lg:w-1/2 py-5 px-[3rem] flex flex-col gap-5">
      <h1 className="text-xl font-semibold">My Profiles</h1>
      {isLoading ? (
        <div className="mx-auto">
          <LoadingSpinner isLoading={isLoading} message="Fetching Profile..." />
        </div>
      ) : (
        <>
          <ShortProfile initialData={initialData} fetchProfile={fetchProfile} />
          <PersonalInformation
            initialData={initialData}
            fetchProfile={fetchProfile}
          />
          <ResetPassword />
        </>
      )}
    </div>
  );
}
