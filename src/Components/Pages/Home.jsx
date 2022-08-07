import React from "react";
import { useState, useEffect } from "react";
import Http from "../Utilities/Http";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserRow from "./UserRow";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  const fetchRolesFromDB = () => {
    Http.get("/roles")
      .then((response) => {
        localStorage.setItem("roles", JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => {
        if (error.response.data.message === 'Session expired') {
          localStorage.removeItem('Authorization', ()=> {
            window.location.href = '/login';
          });
        }
        console.log(error);
        return [];
      });
  };

  const fetchRolesFromCache = () => {
      const roles = localStorage.getItem("roles");
      return roles ? JSON.parse(roles) : false;
  };

  const fetchRoles = () => {
    let allRoles = fetchRolesFromCache();
    if (fetchRolesFromCache()) {
      setAllRoles(allRoles);
      return;
    }
    
    setAllRoles(fetchRolesFromDB());
    return;
  };

  const fetchUsers = () => {
    Http.get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        if (error.response.data.message === 'Session expired') {
          localStorage.removeItem('Authorization', ()=> {
            window.location.href = '/login';
          });
        }
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return <UserRow fetchUsers={fetchUsers} allRoles={allRoles} key={index} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
