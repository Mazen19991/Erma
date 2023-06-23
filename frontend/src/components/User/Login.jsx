import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Auth from "./Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackdropLoader from "../Layouts/BackdropLoader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../actions/userAction";
import logo from "../../assests/images/logo.png";
import logo1 from "../../assests/images/ermalogo.png";
import "../../global.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${user.username}`);
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      {loading && <BackdropLoader />}
      <Auth>
        <div
          style={{
            borderRadius: "50px",
            border: "2px solid white",
          }}
          className="bg-white border flex flex-col gap-2 p-12 pt-12 shadow-md shadow-[#5b064a]"
        >
          <img
            draggable="false"
            className="mx-auto h-30 w-36 object-contain scale-150"
            src={logo1}
            alt=""
          />
          <form
            onSubmit={handleLogin}
            style={{ color: "#fff" }}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              className="whiteplaceholder"
              style={{ color: "#fff" }}
              label="Email/Username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="small"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="small"
              fullWidth
            />
            <button
              type="submit"
              className=" font-medium py-2 rounded bg-[#ffebeb] text-[#5b064a] w-full hover:bg-[#5b064a] hover:text-[#ffebeb]"
            >
              Log In
            </button>
            <span className="my-3" style={{ color:"#d30aa8" }}>
              OR
            </span>
            <Link
              to="/password/forgot"
              className="text-sm font-medium"
              style={{ color: "#5b064a" }}
            >
              Forgot password?
            </Link>
          </form>
        </div>

        <div
          style={{
            borderRadius: "50px",
            border: "2px solid white",
          }}
          className="bg-white border p-5 text-center shadow-md shadow-[#5b064a]"
        >
          <span>
            Don't have an account?{" "}
            <Link to="/register" style={{ color:"#d30aa8" }}>
              Sign up
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
};

export default Login;
