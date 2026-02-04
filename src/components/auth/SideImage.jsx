export default function SideImage() {
  return (
    <div className="hidden md:flex md:w-1/2 relative">
      <h2 className="text-2xl absolute top-5 md:left-6 lg:left-15 text-white font-bold">
        Arthavo
      </h2>
      <img src={"/background/finance.jpg"} className="object-cover" />
      <div className="grid w-full absolute bottom-20 md:left-6 lg:left-15 text-white ">
        <p className="text-md lg:text-[17px] font-semibold lg:w-1/2">
          "It’s not how much money you make, but how much money you keep, how
          hard it works for you, and how many generations you keep it for"
        </p>
        <p className="font-semibold mt-2">Robert Kiyosaki</p>
        <p className="text-[14px]">Author of Rich Dad Poor Dad</p>
      </div>
    </div>
  );
}
