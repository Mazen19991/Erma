import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import BackdropLoader from "../Layouts/BackdropLoader";
import logo1 from "../../assests/images/logo1.png";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading && <BackdropLoader />}
      <Auth>
        <div
          style={{
            borderRadius: "25px",
            border: "2px solid white",
          }}
          className="bg-white border flex flex-col gap-2 p-4 pt-10"
        >
          <img
            draggable="false"
            className="mx-auto h-30 w-36 object-contain"
            src={logo1}
            alt=""
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="font-medium py-2 rounded text-white w-full"
              style={{ backgroundColor: "#1B192E" }}
            >
              Submit
            </button>
          </form>
        </div>

        <div
          style={{
            borderRadius: "25px",
            border: "2px solid white",
          }}
          className="bg-white border p-5 text-center"
        >
          <span>
            Don't have an account?{" "}
            <Link
              style={{ color: "#DD1367" }}
              to="/register"
              className="text-primary-blue"
            >
              Sign up
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
};

export default ForgotPassword;
