import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, phone, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/process-register",
        JSON.stringify({ name, email, password, phone, address }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg(
          <span className="bg-danger form-control">No server response!</span>
        );
      } else if (error.response?.status === 409) {
        setErrMsg(
          <span className="bg-danger form-control">
            this email/phone is already exists!
          </span>
        );
      } else if (error.response?.status === 422) {
        setErrMsg(
          <span className="bg-danger form-control">
            user registration failed!
          </span>
        );
      } else {
        setErrMsg(
          <span className="bg-danger form-control">Registration Failed!</span>
        );
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="bg-secondary vh-100" style={{ marginTop: "55px" }}>
          <h2>Verify Account</h2>
          <section className="col-sm-6 offset-3">
            <div className="bg-primary rounded-3 px-2 mt-5">
              <span>
                check your mail, Please verify your account by token
              </span>
              <br />
              <p>To verify your account 
                <Link className="text-warning" to="/activate"> click here</Link>
              </p>
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-secondary vh-100" style={{ marginTop: "55px" }}>
          <h2>Registration Page</h2>
          <section className="col-sm-6 offset-3">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-primary rounded-3 px-2 mt-5"
            >
              <h5 className="text-center pt-3">Registration Form</h5>
              <label htmlFor="name">Name:</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Name"
                ref={userRef}
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />

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

              <label htmlFor="phone">Phone:</label>
              <input
                className="form-control"
                type="phone"
                name="phone"
                placeholder="Enter Phone"
                ref={userRef}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />

              <label htmlFor="address">Address:</label>
              <input
                className="form-control"
                type="text"
                name="address"
                placeholder="Enter Address"
                ref={userRef}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
              <button
                type="submit"
                className="btn btn-success mt-2 form-control"
              >
                Registration
              </button>
              <span className="text-white">Already have an account?</span>
              <Link className="btn btn-success form-control mb-2" to="/login">
                Login
              </Link>
            </form>
          </section>
        </div>
      )}
    </>
  );
};
export default Login;
