
import React from "react";
import Tile from "./Tile";

function Board( {puzzle, grid, handleChange, SelecetCell}) {
  return (
    <div className="board" >
      <Tile 
      puzzle= {puzzle}
      grid ={grid}
      handleChange ={handleChange}
      SelecetCell = {SelecetCell}
       />
    </div>
  );
}

export default Board;