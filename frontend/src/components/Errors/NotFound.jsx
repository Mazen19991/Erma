import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-2xl font-medium">
        Sorry, this page isn't available.
      </h1>
      <p className="text-md">
        Make sure your owner is using the right link.
        <Link to="/" className="text-blue-900">
          Go back to ERMA.
        </Link>
      </p>
      <Link
        to="/"
        style={{ backgroundColor: "#1B192E" }}
        className="bg-primary-blue px-4 py-2 text-white font-medium rounded hover:drop-shadow-lg"
      >
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
