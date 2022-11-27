import React from 'react';
import NumberButton from './NumberButton';

function Numbers({setActiveNumber}) {
    const numbers = [1,2,3,4,5,6,7,8,9];

    return (
        <div  className='button-container'>
           { numbers.map((number) => {
                return (
                    <NumberButton 
                    setActiveNumber = {setActiveNumber}
                    number = {number} 
                    key = {number}    
                    />
                )

            })  }
        </div>
    );
}

export default Numbers;