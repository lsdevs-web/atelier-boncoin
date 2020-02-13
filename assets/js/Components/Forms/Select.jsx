import React from 'react';

const Select = ({Handle, name, style, defValue, title, children, error}) => {
    return (
        <>
        <select onChange={Handle} name={name} style={style} className={"form-control " + (error && "is-invalid")} id=""
                defaultValue={defValue}>
            <option disabled hidden>{title}</option>
            {children}
        </select>
       {error && <p className="invalid-feedback">{error}</p>}
       </>
    );
};

export default Select;