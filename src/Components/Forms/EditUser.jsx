import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Http from "../Utilities/Http";
import MultiSelectDropDown from "./FormElements/MultiSelectDropdown";
import TextField from "./FormElements/TextField";

const EditUser = ({ user, fetchUsers, allRoles, openModal, setOpenModal }) => {
  const [errors, setErrors] = useState({});
  const toggle = () => setOpenModal(!openModal);
  const closeBtn = (
    <button
      size="md"
      style={{ color: "white", height: "25px", width: "25px" }}
      className="bg-dark"
      onClick={toggle}
    >
      X
    </button>
  );

  const initialRoles = () => {
    let roles = [];

    user.roles.forEach(role => {
        if (!roles.includes(role.id)) {
            roles.push(role.id);
        }
    });

    return roles;
  }

  const [inputs, setInputs] = useState({
    id: user?.id ?? null,
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: user?.password ?? "",
    roles: user?.roles ? initialRoles() : [],
  });

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

  const submitForm = (event) => {
    event.preventDefault();
    setErrors({});

    Http.put("/user", inputs)
      .then((res) => {
        setOpenModal(false);
        window.location.href = '/';
      })
      .catch((res) => {
        if (res.response.data.message === 'Session expired') {
            localStorage.removeItem('Authorization', ()=> {
              window.location = '/login';
            });
        } else {
          localStorage.removeItem("Authorization", () => {
            alert("you are not authorized to this page: logging out..");
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
    <Modal
      centered
      isOpen={openModal}
      toggle={toggle}
      className="modal-container"
    >
      <ModalHeader
        style={{ width: "100%" }}
        close={closeBtn}
        className="bg-dark"
      >
        <p style={{ color: "white" }}>Edit User</p>
      </ModalHeader>
      <ModalBody>
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
          <MultiSelectDropDown
            errors={errors}
            lable="Role"
            values={inputs?.roles}
            name="roles"
            onChange={handleMultiselectDropDown}
            options={allRoles && allRoles}
            required={true}
          />

          <input type="submit" className="btn btn-primary" value="Update" />
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditUser;
