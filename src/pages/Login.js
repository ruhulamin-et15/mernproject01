import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // setAuth({email, password, roles, accessToken})

      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg(
          <span className="bg-danger form-control">No server response!</span>
        );
      } else if (error.response?.status === 401) {
        setErrMsg(
          <span className="bg-danger form-control">
            user email/password incorrect!
          </span>
        );
      } else {
        setErrMsg(
          <span className="bg-danger form-control">Login Failed!</span>
        );
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="bg-secondary vh-100" style={{ marginTop: "55px" }}>
          <h2>Login Account</h2>
          <section className="col-sm-6 offset-3">
            <div className="bg-primary rounded-3 px-2 mt-5">
              <h1>You are logged in</h1>
              <br />
              <p>
                <Link to="/profile" className="text-white">
                  Go to Your Profile
                </Link>
              </p>
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-secondary vh-100" style={{ marginTop: "56px" }}>
          <h2>Login Page</h2>
          <section className="col-sm-6 offset-3">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleLogin} className="bg-primary rounded-3 px-2 mt-5">
          <h5 className="text-center pt-3">Login Your Account:</h5>
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter Email"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter Password"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button type="submit" className="btn btn-success mt-2 form-control">
              Login
            </button>
            <span className="text-white">Need an account?</span>
            <Link className="btn btn-success form-control mb-2" to="/register">
              Register
            </Link>
          </form>
        </section>
        </div>
      )}
    </>
  );
};
export default Login;
