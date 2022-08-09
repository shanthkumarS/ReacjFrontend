import React, { useState } from "react";
import Http from "../Utilities/Http";
import PasswordField from "./FormElements/PasswordField";
import TextField from "./FormElements/TextField";

const LoginUser = ({onLogin}) => {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        "email" : '',
        "password" : ''
    });

    const submitForm = (event) => {
        event.preventDefault();
        setErrors({});
        
        Http.post('/login', formData).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));
            localStorage.setItem('Authorization', `Basic ${btoa(formData.email + ':' +formData.password)}`)
            onLogin();
            window.location.href = "/";
        }).catch((res) => {
            Object.keys(res.response.data.errors).forEach(key => {
                setErrors(previousError => ({
                    ...previousError,
                    [key]:res.response.data.errors[key][0]
                }))
            });
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(previousFromData => ({
            ...previousFromData,
            [name]:value
        }))
    }

    return (
        <div className="row justify-content-center">
            <h2 className="row justify-content-center">Login</h2>
            <div className="card col-sm-6 p-5">
                <form onSubmit={submitForm}>
                    <TextField errors={errors} lable="Email" name="email" value={ formData?.email ?? '' } onChange={ handleChange } required={ true } />
                    <PasswordField errors={errors} lable="password" name="password" value={ formData?.password ?? '' } onChange={ handleChange } required={ true } />

                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default LoginUser;