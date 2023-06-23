import React from "react";

const Auth = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#ffebeb" }} className="w-full h-full">
      <div className="flex w-full h-screen md:w-1/3 py-16 mx-auto">
        <div className="flex flex-col gap-3 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Auth;
