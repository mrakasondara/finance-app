import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm() {
  return (
    <>
      <h2 className="text-2xl font-bold">
        Hey, Welcome Back to <span className="text-main">Vaulto</span>
      </h2>
      <p className="text-[13px]">Login and manage your financial</p>
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
          <Input type="password" placeholder="Enter your password" required />
        </div>

        <div className="flex flex-col gap-2 items-start w-full md:w-[75%] lg:w-1/2">
          <Link
            href={"/forgot"}
            className="text-main hover:underline mb-4 text-[12px]"
          >
            Forgot password?
          </Link>

          <Button className="btn bg-main border-main hover:bg-white hover:text-main w-full mx-auto rounded-lg">
            Login
          </Button>

          <p className="text-[13px] mx-auto mt-3">
            Doesn't have an account?{" "}
            <Link href={"/register"} className="text-main hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
