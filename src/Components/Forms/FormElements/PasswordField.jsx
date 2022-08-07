import React from "react";

const PasswordField = ({lable, name, value, onChange, required, errors}) => {

    return (
        <>
            <label>{lable}{
                required && <span style={{color: "red"}}>*</span>
            }</label>
            <input type="password" hiddentype="text" name={name} value={value} className="form-control mb-2" onChange={onChange} />
            {
                (errors[name]) && <p style={{color: "red", fontSize: "10px"}}>{(errors[name])}</p>    
            }
        </>
    )
}

export default PasswordField;