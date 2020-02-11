import React from 'react';

const Field = ({name, value, type = "text", error = "", placeholder, label, onChange, width=""}) => {
    return (
        <div className={"form-group"}>
            <label htmlFor={name}
                   style={{fontSize: "20px"}}
                   className="my-2">
                {label}
            </label>

            <input onChange={onChange}
                   value={value}
                   type={type}
                   className={"form-control " + (error && "is-invalid")}
                   placeholder={placeholder}
                   name={name}
                   required
            />

            {error && <p className="invalid-feedback">{error}</p>}

        </div>
    );
};

export default Field;