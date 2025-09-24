import Link from "next/link";

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
          <label className="input validator w-full bg-white border-2 border-black focus:outline-main">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              className="bg-white"
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>

        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <label className="input w-full bg-white border-2 border-black outline-main">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input type="password" required placeholder="Password" />
          </label>
        </div>

        <div className="w-full md:w-[75%] lg:w-1/2 flex flex-col gap-2">
          <label htmlFor="confirm-password" className="font-semibold">
            Confirm Password
          </label>
          <label className="input w-full bg-white border-2 border-black outline-main">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input type="password" required placeholder="Password" />
          </label>
        </div>

        <div className="flex flex-col gap-2 items-start w-full md:w-[75%] lg:w-1/2">
          <button className="btn bg-main border-main hover:bg-white hover:text-main w-full mx-auto rounded-lg">
            Register
          </button>

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
