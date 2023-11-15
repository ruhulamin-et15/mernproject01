import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [token, setToken] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [token]);

  const handleActivate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/activate",
        JSON.stringify({ token }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));

      setToken("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg(
          <span className="bg-danger form-control">No server response!</span>
        );
      } else if (error.response?.status === 401) {
        setErrMsg(
          <span className="bg-danger form-control">Invalid Token!</span>
        );
      } else if (error.response?.status === 409) {
        setErrMsg(
          <span className="bg-danger form-control">
            This token already used!
          </span>
        );
      } else {
        setErrMsg(
          <span className="bg-danger form-control">
            User Activation Failed!
          </span>
        );
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="bg-secondary vh-100" style={{ marginTop: "55px" }}>
          <h2>Verify Account:</h2>
          <section className="col-sm-6 offset-3">
            <div className="bg-primary rounded-3 px-2 mt-5">
              <h1 className="text-white">Registration has been successful</h1>
              <br />
              <p>
                <Link className="text-warning" to="/">
                  Go to your profile
                </Link>
              </p>
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-secondary vh-100" style={{ marginTop: "55px" }}>
          <h2>Activate Page:</h2>
          <section className="col-sm-6 offset-3">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleActivate} className="bg-primary rounded-3 px-2 mt-5">
          <h5 className="text-center pt-3">Active Account By Token</h5>
            <input
              className="form-control"
              type="text"
              name="token"
              placeholder="Enter Token"
              ref={userRef}
              onChange={(e) => setToken(e.target.value)}
              value={token}
              required
            />
            <button type="submit" className="btn btn-success mt-2 form-control">
              Registration Complete
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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Activate = () => {
//   const [data, setData] = useState();
//   const navigate = useNavigate();
//   const handleData = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     navigate("/login", { replace: true });

//     const response = await fetch("http://localhost:3001/api/users/activate", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const result = await response.json();
//     console.log(result);
//     alert(result.message)
//   };

//   return (
//     <>
//     <section className="bg-primary col-sm-6 offset-3 p-3 mt-5 rounded-3">
//     <form
//       method="post"
//       onSubmit={handleSubmit}
//     >
//       <h1 className="text-center">Activate Page</h1>
//       <input
//         onChange={handleData}
//         className="form-control"
//         type="text"
//         name="token"
//         placeholder="Enter Your Token:"
//         required
//       />
//       <br />
//       <button type="submit" className="btn btn-success form-control">
//         Verify Your Account
//       </button>
//     </form>
//     </section>
//     </>
//   );
// };

// export default Activate;
