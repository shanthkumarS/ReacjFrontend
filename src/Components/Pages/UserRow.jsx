import React, { useEffect, useState } from "react";
import EditUser from "../Forms/EditUser";
import Http from "../Utilities/Http";

const UserRow = ({user, fetchUsers, allRoles}) => {
    const [userRoles, setUserRoles] =  useState([]);
    const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);


    useEffect(() => {
        setUserRoles([]);

        user.roles.forEach(role => {
            if (! userRoles.includes(role.name)) {
                userRoles.push(role.name);
            }
        });

        setUserRoles([userRoles]);

    }, []);

    const handleEditClick = () => {
        setEditUserModalOpen(!isEditUserModalOpen);
    }

    const deleteUser = (id) => {
        window.confirm("Do yo want to delete the record ?", "YES", "NO");
        Http.delete(`user/${id}`).then((res) => {
            window.location.href = '/';
        }).catch(error => {
            console.log(error);
            alert("Unable to delete the record");
        })
    } 

    return (
        
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{userRoles.join(', ')}</td>
            <td onClick={handleEditClick}><i className="bi bi-pencil"></i></td>
            <td onClick={() => {
                deleteUser(user.id);
            }}><i className="bi bi-trash"></i></td>
        
            {/* <td><a href={`user/${user.id}`}><i className="bi bi-trash"></i></a></td> */}
            {
                isEditUserModalOpen && <EditUser fetchUsers={fetchUsers} allRoles={allRoles} user={user} openModal={isEditUserModalOpen} setOpenModal={setEditUserModalOpen}/>
            }
        </tr>
    );

}

export default UserRow;