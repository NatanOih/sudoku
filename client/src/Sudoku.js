import React, {useState, useRef, useEffect } from "react";
import Board from "./ui/Board";
import Interface from "./ui/Interface";
import {REST} from "./service/api.js";
import Numbers from "./ui/Numbers";
import initReactFastclick from "react-fastclick";
initReactFastclick();

const getGrid = () => {
    return  Array(9).fill(0).map((x)=> Array(9).fill(0))
}

const copyGrid = (from, to) => {
    for ( let i = 0; i < from.length; i++ ){
        to[i] = [...from[i]];
    }
};

const Sudoku = () => {
    const [grid, setGrid] = useState(getGrid)
    const [puzzleStatus, setPuzzleStatus] = useState("")
    const initialGrid = useRef(getGrid());
    const [selectedCell, SelecetCell ]= useState([0,0])
    const [newGrid , setNewGrid] = useState(0)
    
    // loads last saved thing
    useEffect(() =>{
        const lastMove = localStorage.getItem('last Move');
        const lastGrid = localStorage.getItem('last created grid');
        

            if (lastMove) {
                setGrid(JSON.parse(lastMove))
            }
            if (lastGrid){
                if(lastGrid !== 0){
                    copyGrid(JSON.parse(lastGrid), initialGrid.current);
                };
            };     
    }, []);

    // saves every move
    useEffect(() =>{
            localStorage.setItem('last Move', JSON.stringify(grid));
        // localStorage.setItem('last created grid', JSON.stringify(newGrid));
    }, [grid]);

    //save Created Grid
    useEffect(() =>{
            if (newGrid!==0){
                localStorage.setItem('last created grid', JSON.stringify(newGrid));
            }
            
    }, [newGrid]);


    const handleCreate =  async () => {
        try {
         
            const response = await REST.getBoard();
            const data = await response.json();
            setNewGrid(data.game)
            return data.game;
        } catch(error) {
            console.log (error);
        }   
    };

    const handleSolve =  async () => {
        try {
            const response = await REST.solveBoard(grid);
            const data = await response.json();
            if(data.status){
                setPuzzleStatus("** SOLVED **")
                return data.solution;
            } else {
                setPuzzleStatus("** UNSOLVABLE **")
                return grid;
            }
        } catch(error) {
            console.log (error);
        }   
    };

    const handleValidate =  async () => {
        try {
            const response = await REST.validateBoard(grid);
            const data = await response.json();
            return data.status;
        } catch(error) {
            console.log (error);
        }   
    };


    const handleInterface = async (action) => {
        let newGrid;
        switch(action) {
            case "create":
                console.log("creating new game")
                newGrid = await handleCreate();
                setPuzzleStatus("NEW GAME-ENJOY");
                setGrid(newGrid);
                copyGrid(newGrid, initialGrid.current)
                break;
            case "solve":
                newGrid = await handleSolve();
                setGrid(newGrid)
                break;
            case "validate":
                const status = await handleValidate();
                const puzzleStatus = status ? "**SOLVED**" : "**UNSOLVED**";
                setPuzzleStatus(puzzleStatus);
                break;
            case "clear":
                setPuzzleStatus("NEW GAME-ENJOY")
                const lastMove = localStorage.getItem('last created grid');
                setGrid(JSON.parse(lastMove))
                break;
            default: 
                throw new Error("Invalid action");
        }   
    }

    const handleChange = (row, col, e) => {
            let n = Number(String(e.target.value).slice(-1))
            if(n < 10 && initialGrid.current[row][col] === 0){
                const newGrid = [...grid];
                newGrid[row][col] = n;
                setGrid(newGrid);
            } 
        }
    
    const setNumber = (number) => {
        const [row, col] = selectedCell;
        if(initialGrid.current[row][col] === 0){
            const newGrid = [...grid];
            newGrid[row][col] = number;
            setGrid(newGrid);
        }
    }




    return <div className="Sudoku">
        <Board 
        puzzle= {initialGrid.current}
        grid ={grid} 
        handleChange = {handleChange} 
        SelecetCell = {SelecetCell}   
        />

        <Numbers 
            setActiveNumber = {setNumber} 
        />

        <Interface 
        handleInterface = {handleInterface} 
        status = {puzzleStatus}
         />
    </div>
}

export default Sudoku;