import React from "react";

const MultiSelectDropDown = ({lable, name, options, onChange, values, required, errors}) => {
    return (
        <>
            <label>{lable}{
                required && <span style={{color: "red"}}>*</span>
            }</label>
            <select multiple name={name} className="form-control mb-2" onChange={onChange} >
                {options.map((option, index) => {
                    return (
                        <option key={index} defaultValue={option.id} value={option.id} selected={values?.includes(option.id)}>{option.name}</option>
                    )
                })}
            </select>
            {
                (errors[name]) && <p style={{color: "red", fontSize: "10px"}}>{(errors[name])}</p>    
            }
        </>
    )
}

export default MultiSelectDropDown;