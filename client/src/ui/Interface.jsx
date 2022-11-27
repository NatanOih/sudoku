import React from 'react';

const Interface = ( {handleInterface, status} ) => {
    return (
        <div className='interface'>
            <div className='info-interface'>
                <input readOnly type ="text" value={status} /> 
            </div>
            <div className='action-interface'>
                <button className='button-56'  onClick={() => handleInterface("create")}> Create </button> 
                <button className='button-56'  onClick={() =>handleInterface("validate")} > Validate </button> 
                <button className='button-56'  onClick={() =>handleInterface("solve")}> Solve </button> 
                <button className='button-56'  onClick={() =>handleInterface("clear")} > Clear </button> 
            </div>
        </div>
    );
};

export default Interface;