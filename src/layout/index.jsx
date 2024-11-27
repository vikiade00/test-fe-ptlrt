import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <main className=" bg-gray-100 w-full py-20 lg:p-20">
          <div className="p-10 bg-white rounded-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
