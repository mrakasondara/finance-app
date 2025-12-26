import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function RegisterForm() {
  return (
    <>
      <h2 className="text-2xl font-bold">Get Started</h2>
      <p className="text-[13px]">
        Welcome to <span className="text-main">Vaulto</span>- Let's create your
        account
      </p>

      <form className="mt-[3rem] flex flex-col md:items-center gap-4 w-full">
        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            E-mail Address
          </label>
          <Input type="email" placeholder="mail@site.com" required />
        </div>

        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input type="password" placeholder="Password" required />
        </div>

        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="confirm-password" className="font-semibold">
            Confirm Password
          </label>
          <Input type="password" placeholder="Password" required />
        </div>

        <div className="flex flex-col gap-2 items-start w-full md:w-[75%] lg:w-1/2">
          <Button className="btn bg-main border-main hover:bg-white hover:text-main w-full mx-auto rounded-lg">
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
