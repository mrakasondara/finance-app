import RegisterForm from "@/components/auth/RegisterForm";
import SideImage from "@/components/auth/SideImage";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

export const metadata = {
  title: "Register",
};

export default async function Register() {
  const user = await getServerSession();
  if (user) {
    redirect("/", RedirectType.replace);
  }
  return (
    <div className="flex h-screen text-black bg-white">
      <SideImage />
      <div className="flex w-3/4 md:w-1/2 flex-col items-center my-auto mx-auto md:mx-0 p-5 ">
        <RegisterForm />
      </div>
    </div>
  );
}
