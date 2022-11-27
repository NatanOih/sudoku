import express from "express";
import cors from "cors";
import { Sudoku } from "./Sudoku.js";
import { Util } from "./Util.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});




app.get('/express_backend', (req, res) => { 
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
  }); 


app.get('/haim', (req, res) =>{

  res.send({ express: 'HAIM' }); 
}); 

app.get("/puzzle", (req, res) => {
  let sudoku = new Sudoku();
  let puzzle = sudoku.puzzle;
  res.status(200).send({ game: puzzle });
});

app.post("/solve", (req, res) => {
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  let sudoku = new Sudoku(puzzle);
  let solution = sudoku.isSolvable();
  let solvedSudoku;
  let status;
  if (solution) {
    solvedSudoku = sudoku.solvedPuzzle;
    status = true;
  } else {
    solvedSudoku = req.body.board;
    status = false;
  }
  res.status(200).send({ solution: solvedSudoku, status: status });
});

app.post("/validate", (req, res) => {
  console.log("/validate recived post")
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  let sudoku = new Sudoku(puzzle);
  let status = sudoku.validate();
  res.status(200).send({ status: status });
});

app.get("/loadSaved", (req, res) => {
  console.log("-------------- loadSaved recived get------------------")
  res.status(200).send({ loadBoard: lastBoard });
});

app.post("/saveGrid", (req, res) => {
  Util.copyGrid(req.body.board, lastBoard);

});


