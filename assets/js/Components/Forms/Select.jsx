import React from 'react';

const Select = ({Handle, name, style, defValue, title, children}) => {
    return (
        <select onChange={Handle} name={name} style={style} className={"form-control"} id=""
                defaultValue={defValue}>
            <option disabled hidden>{title}</option>
            {children}
        </select>
    );
};

export default Select;