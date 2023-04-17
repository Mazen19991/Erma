import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Auth from "./Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackdropLoader from "../Layouts/BackdropLoader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../actions/userAction";
import logo from "../../assests/images/logo.png";
import logo1 from "../../assests/images/logo1.png";
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
            // backgroundColor: "#FF85F3",
            borderRadius: "50px",
            border: "2px solid white",
          }}
          // style={{ backgroundColor: "#1B192E" }}
          className="bg-white border flex flex-col gap-2 p-12 pt-12"
        >
          <img
            draggable="false"
            className="mx-auto h-30 w-36 object-contain"
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
              style={{ backgroundColor: "#1B192E" }}
              type="submit"
              className=" font-medium py-2 rounded text-white w-full"
            >
              Log In
            </button>
            <span className="my-3" style={{ color:"#DD1367" }}>
              OR
            </span>
            <Link
              to="/password/forgot"
              className="text-sm font-medium"
              style={{ color: "#1B192E" }}
            >
              Forgot password?
            </Link>
          </form>
        </div>

        <div
          style={{
            // backgroundColor: "#FF85F3",
            borderRadius: "50px",
            border: "2px solid white",
          }}
          className="bg-white border p-5 text-center"
        >
          <span>
            Don't have an account?{" "}
            <Link to="/register" style={{ color:"#DD1367" }}>
              Sign up
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
};

export default Login;
