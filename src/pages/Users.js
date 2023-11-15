import React, { useEffect, useState } from "react";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users/", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <div className="bg-secondary vh-100" style={{ marginTop: "56px" }}>
        <h2>Users Page</h2>
        <section className="col-sm-6 offset-3">
          <div className="bg-primary rounded-3 px-2 mt-5">
            <h5 className="text-center pt-3">Users List</h5>
            {users?.length ? (
              <ul>
                {users.map((user, i) => (
                  <li key={i}>{user?.username}</li>
                ))}
              </ul>
            ) : (
              <p>No users to display</p>
            )}
            <button className="btn btn-warning mb-2 w-50 offset-3" onClick={() => refresh()}>
              Refresh
            </button>
          </div>
        </section>
      </div>
    </>
    // <article>
    //     <h2>Users List</h2>
    //     {users?.length?(
    //         <ul>
    //             {users.map((user, i)=><li key={i}>{user?.username}</li>)}
    //         </ul>
    //     ): <p>No users to display</p>
    // }
    // <button className='btn btn-warning' onClick={()=>refresh()}>Refresh</button>
    // </article>
  );
};

export default Users;
