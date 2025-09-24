import LoginForm from "@/components/LoginForm";
import SideImage from "@/components/SideImage";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex h-screen text-black bg-white">
      <SideImage />
      <div className="flex w-3/4 md:w-1/2 flex-col items-center my-auto mx-auto md:mx-0 p-5 ">
        <LoginForm />
      </div>
    </div>
  );
}
