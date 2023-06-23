import React from "react";
import Header from "../../Navbar/Header";
import Sidebar from "./Sidebar";

const Update = ({ children, activeTab }) => {
  return (
    <>
      <div style={{height:"100vh", marginTop:"5%" }} className="sm:pr-14 sm:pl-8 flex justify-center items-center">  
        <div style={{ display:"flex", justifyItems:"center" }} className="flex border rounded bg-white w-full mx-auto xl:w-2/3 shadow-md text-[#5b064a]">
          <Sidebar activeTab={activeTab} />
          {children}
        </div>
      </div>
    </>
  );
};

export default Update;
