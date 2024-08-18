import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPannel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-[calc(53.5vh-120px)] pt-10  md:flex hidden">
      <aside className="bg-white pt-16  min-h-full w-full max-w-60 ">
        <div className="h-32 bg-white  flex justify-center items-center flex-col">
          <div
            className="text-6xl text-black cursor-pointer  flex justify-center "
            title="Account"
          >
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <div className="text-left">
          <p className="capitalize text-center text-lg font-semibold text-black mb-1">
            {user?.name}
          </p>
          <p className=" text-sm text-left font-semibold text-black mb-0">
            Role: {user?.role}
          </p>
          <p className=" text-sm font-semibold text-black ">
            Email: {user?.email}
          </p>
          </div>

        </div>
        <div className="grid pt-5 mt-60">
          <Link
            to={"all-users"}
            className="px-3 py-1 text-black hover:bg-slate-100"
          >
            All Users
          </Link>
          <Link
            to={"all-Rooms"}
            className="px-3 py-1 text-black hover:bg-slate-100"
          >
            All Rooms
          </Link>
          <Link
            to={"all-events"}
            className="px-3 py-1 text-black hover:bg-slate-100"
          >
            Events
          </Link>
          <a
            href="http://localhost:3006/"
             target="_blank"
             rel="noopener noreferrer"
             className="px-3 py-1 text-black hover:bg-slate-100"
          >
            HOUSE KEEPING
          </a>
          
          <a
            href="http://localhost:3008/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-black hover:bg-slate-100"
          >
            Reservations
          </a>
        </div>
      </aside>
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPannel;
