import { BiWallet } from "react-icons/bi";

const Card = ({ title, value, textColor, bgColor }) => {
  return (
    <div className="flex gap-3 py-4 px-5 items-center shadow-lg hover:shadow-md rounded-md hover:shadow-main transition">
      <div className="avatar avatar-placeholder">
        <div className={`${bgColor} text-neutral-content w-8 rounded-lg`}>
          <span className={`${textColor} text-xl`}>
            <BiWallet />
          </span>
        </div>
      </div>

      <div className="grid text-black">
        <h4 className="text-gray-500 uppercase">{title}</h4>
        <p className="text-sm font-semibold opacity-85">
          <span className="mr-1">Rp.</span>
          {value}
        </p>
      </div>
    </div>
  );
};

export default Card;
