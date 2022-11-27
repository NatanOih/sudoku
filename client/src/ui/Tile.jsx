import React from 'react';

const Tile = ( {puzzle, grid, handleChange, SelecetCell} ) => {
    return grid.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
        let className  =  col !==0 ? "tile taken " : "tile "
        let addShift ="";
        if (colIndex % 3 === 2){
            addShift += ' right '
        }
        if (rowIndex % 3 === 2){
            addShift += ' down '
        }
    
        
        let puzzleInit =''
        if (puzzle[rowIndex][colIndex] !== 0){
            puzzleInit = " init"
        } else{
            puzzleInit =''
        }
        
            return (
                <input 
               
                className= {className + addShift + puzzleInit}
                type="text" 
                onChange={(e) => handleChange(rowIndex, colIndex, e)}
                onClick = {e => SelecetCell([rowIndex, colIndex])}
                value= {col === 0 ? "" : col}
                key={rowIndex + "" + colIndex}   
                />
            );
        });
    });
}

export default Tile;