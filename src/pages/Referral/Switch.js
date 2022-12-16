import React, { useState, useEffect } from 'react';
import './Switch.css';

const Switch = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className='text-center m-auto'>
        <input
            className="react-switch-checkbox"
            id={`react-switch-new`}
            type="checkbox"
            // value='OFF'
            onClick={() => {isChecked === false?setIsChecked(true):setIsChecked(false)}}
        />
        <label
            className="react-switch-label d-flex justify-content-between"
            htmlFor={`react-switch-new`}
        >
            <span className='pl-4 left-text text-center'>Traders</span>
            <span className={`react-switch-button`}>{isChecked === false ? "Traders" : "Affiliate"}</span>
            <span className='pl-2 right-text'>Affiliate</span>
        </label>
        </div>
    );
};

export default Switch;