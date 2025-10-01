"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const isAuth = path?.startsWith("/login") || path?.startsWith("/register");

  return (
    <header
      className={`${
        isAuth ? "hidden" : "flex"
      } justify-between items-center bg-white gap-3 p-5 shadow-md`}
    >
      <h1 className="text-2xl font-bold text-main">Vaulto</h1>

      <div
        tabIndex={0}
        role="button"
        className="flex dropdown dropdown-bottom dropdown-end gap-3 py-2 px-5 items-center shadow-lg rounded-md"
      >
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            <img src="profile.png" alt="" />
          </div>
        </div>

        <div className="grid text-black">
          <h4 className="font-semibold">Jane Doe</h4>
          <p className="text-sm opacity-85">janedoe@gmail.com</p>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white text-black rounded-box z-1 w-52 right-15 p-2 shadow-sm"
        >
          <li>
            <a className="text-main">Profile</a>
          </li>
          <li>
            <a className="text-main">Logout</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
