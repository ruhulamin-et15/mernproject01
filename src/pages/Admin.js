import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="bg-secondary vh-100" style={{ marginTop: "56px" }}>
      <h2>Admin Page</h2>
      <section className="col-sm-6 offset-3">
        <div className="bg-primary rounded-3 px-2 mt-5">
          <h5 className="text-center pt-3">Admin Name</h5>
          <Link to="/users" className="col-sm-6 btn btn-warning w-50 offset-3 mb-2">Users List</Link>
        </div>
      </section>
    </div>
  );
};

export default Admin;
