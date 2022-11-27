import React from 'react';

function NumberButton(props) {
    return (
            <button className='number' onClick={ () => {
                props.setActiveNumber(props.number)
            }}> 
            {props.number} 
            </button>
    );
}

export default NumberButton;