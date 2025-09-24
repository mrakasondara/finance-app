"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const isAuth = path?.startsWith("/login") || path?.startsWith("/register");

  return (
    <header
      className={`${
        isAuth ? "hidden" : "flex"
      } justify-end items-center bg-white gap-3 p-5 shadow-md`}
    >
      <div
        tabIndex={0}
        role="button"
        className="flex dropdown dropdown-bottom dropdown-end gap-3 py-2 px-5 items-center shadow-lg rounded-md"
      >
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-xs">UI</span>
          </div>
        </div>

        <div className="grid text-black">
          <h4 className="font-semibold hover:text-main">Jane Doe</h4>
          <p className="text-sm opacity-85">janedoe@gmail.com</p>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white text-black rounded-box z-1 w-52 right-15 p-2 shadow-sm"
        >
          <li>
            <a className="text-main">Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
