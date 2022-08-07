import React, { useState, useEffect } from "react";
import Http from "../Utilities/Http";
import MultiSelectDropDown from "./FormElements/MultiSelectDropdown";
import PasswordField from "./FormElements/PasswordField";
import TextField from "./FormElements/TextField";

export const CreateUser = () => {
  const [roles, setRoles] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    roles: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((previousInputs) => ({
      ...previousInputs,
      [name]: value,
    }));
  };

  const handleMultiselectDropDown = (event) => {
    const name = event.target.name;
    let selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setInputs((previousInputs) => ({
      ...previousInputs,
      [name]: selectedOptions,
    }));
  };

  const fetchRoles = () => {
    Http.get("/roles")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((res) => {
        if (res.response.data.message === "Session expired") {
          localStorage.removeItem("Authorization", () => {
            window.location.href = '/login';
          });
        }
        setRoles([]);
      });
  };

  const submitForm = (event) => {
    event.preventDefault();
    setErrors({});

    Http.post("/user", inputs)
      .then((res) => {
        window.location.href = '/';
      })
      .catch((res) => {
        console.log(res);
        if (res.response.data.message === "Session expired") {
          localStorage.removeItem("Authorization", () => {
            window.location.href = '/login';
          });
        }
        Object.keys(res.response.data.errors).forEach((key) => {
          setErrors((previousError) => ({
            ...previousError,
            [key]: res.response.data.errors[key][0],
          }));
        });
      });
  };

  return (
    <div className="row justify-content-center">
      <h2 className="row justify-content-center">Add User</h2>
      <div className="card col-sm-6 p-5">
        <form onSubmit={submitForm}>
          <TextField
            errors={errors}
            lable="Name"
            name="name"
            value={inputs?.name ?? ""}
            onChange={handleChange}
            required={true}
          />
          <TextField
            errors={errors}
            lable="Email"
            name="email"
            value={inputs?.email ?? ""}
            onChange={handleChange}
            required={true}
          />
          <PasswordField
            errors={errors}
            lable="password"
            name="password"
            value={inputs?.password ?? ""}
            onChange={handleChange}
            required={true}
          />
          <MultiSelectDropDown
            errors={errors}
            lable="Role"
            value={inputs?.roles}
            name="roles"
            onChange={handleMultiselectDropDown}
            options={roles && roles}
            required={true}
          />

          <input type="submit" className="btn btn-primary" value="Create" />
        </form>
      </div>
    </div>
  );
};
