"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const SideNavbar: React.FC = () => {
  const { data } = useSession();
  const pathname = usePathname();
  const user = data?.user;

  return (
    <aside className="w-56 h-screen bg-gray-900 text-white py-8 px-4 fixed flex flex-col gap-6">
      <nav>
        <ul className="list-none p-0 m-0">
          {user?.role === "admin" && (
            <>
              <li className="mb-4">
                <Link href={`/dashboard/manageProducts/${user.id}`} passHref>
                  <span
                    className={`block px-4 py-2 rounded text-lg cursor-pointer transition-colors duration-200 ${pathname.startsWith(`/dashboard/manageProducts`)
                        ? "bg-blue-500 text-white"
                        : "hover:text-blue-400"
                      }`}
                  >
                    Manage Products
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavbar;
