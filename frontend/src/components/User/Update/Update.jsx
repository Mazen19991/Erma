import React from "react";
import Header from "../../Navbar/Header";
import Sidebar from "./Sidebar";

const Update = ({ children, activeTab }) => {
  return (
    <>
      <div style={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)", height:"100vh", marginTop:"5%" }} className="mx-auto sm:pr-14 sm:pl-8">  
      {/* xl:w-2/3 */}
        <div style={{ display:"flex", justifyItems:"center" }} className="flex border rounded w-full bg-white mx-auto xl:w-2/3">
          <Sidebar activeTab={activeTab} />
          {children}
        </div>
      </div>
    </>
  );
};

export default Update;
