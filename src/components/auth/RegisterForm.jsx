"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import FinanceAPI from "@/lib/FinanceAPI";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setconfirmPasswordValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = {
      email: emailValue,
      password: passwordValue,
    };
    if (passwordValue != confirmPasswordValue) {
      setIsLoading(false);
      return toast.error("Password not match!");
    }
    const response = await FinanceAPI.register(newUser);
    setIsLoading(false);
    if (response.success) {
      toast.success(response.message);
      router.push("/login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Get Started</h2>
      <p className="text-[13px]">
        Welcome to <span className="text-main">Arthavo</span>- Let's create your
        account
      </p>

      <form
        className="mt-[3rem] flex flex-col md:items-center gap-4 w-full"
        onSubmit={registerUser}
      >
        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            E-mail Address
          </label>
          <Input
            type="email"
            placeholder="mail@site.com"
            required
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>

        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input
            type="password"
            placeholder="Password"
            required
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>

        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="confirm-password" className="font-semibold">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPasswordValue}
            onChange={(e) => setconfirmPasswordValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 items-start w-full md:w-[75%] lg:w-1/2">
          <Button className="btn bg-main border-main hover:bg-white hover:text-main w-full mx-auto rounded-lg cursor-pointer">
            {isLoading ? <Spinner /> : ""}
            Register
          </Button>

          <p className="text-[13px] mx-auto mt-3">
            Already have an account?{" "}
            <Link href={"/login"} className="text-main hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
