const elementById = (id) => document.querySelector(`#${id}`)

const gameWindow = elementById("game");
const phaseInfo = elementById("phaseInfo");
const turnInfo = elementById("turnInfo");
const winnerInfo = elementById("winner");
const tut = elementById("tut");

const colors = ["420000","1d0042","ff0000","6200ff"];
const cells = (new Array(9)).fill(null,0,9);
let moves = 0;
let selectedCell = null;
let gameFinised = false;
let playerTurn = false;
let gamePhase = false;// false-> Positioning, true-> Moving 

const clearWindow = ()=>{
    moves = 0;
    gameFinised = false;
    playerTurn = 0;
    gamePhase = false;
    cells.fill(null,0,9)
    phaseInfo.innerHTML = "<h2>Positioning Phase</h2>";
    turnInfo.innerHTML = `<h2>Player 1 Turn</h2>`;
    turnInfo.style.color = `#${colors[0]}`;
    gameWindow.innerHTML = "";
    cells.forEach((cell,index)=>{
        gameWindow.innerHTML += `<div onclick="onCellClicked(this)" id="cell-${index}" class="cell"></div>`;
    })  
    
}

const onCellClicked = (cell)=>{
    if(!gamePhase && cells[cell.id.substr(5,1)] == null){
        placeMark(cell);
        moves++;
        if(moves == 6) {
            gamePhase = true;
            phaseInfo.innerHTML = "<h2>Moving Phase</h2>";
        }
    }else if(gamePhase){
        if(selectedCell == null && cells[cell.id.substr(5,1)] != null && cells[cell.id.substr(5,1)] == playerTurn*1){
            selectedCell = cell;
            elementById(cell.id).children[0].style.boxShadow = `2px 2px 15px 5px #${colors[playerTurn*1]}`;
        }else if(selectedCell){
            if(selectedCell.id == cell.id){
                selectedCell = null;
                elementById(cell.id).children[0].style.boxShadow = "";
            }else if(cells[cell.id.substr(5,1)] == null){
                cells[selectedCell.id.substr(5,1)] = null;
                elementById(selectedCell.id).innerHTML = "";
                selectedCell = null;
                placeMark(cell); 
            }
        }
    }
    
}
const placeMark = (cell)=>{
    cells[cell.id.substr(5,1)] = playerTurn*1;
    elementById(cell.id).innerHTML = `<div class="player-${playerTurn*1}"></div>`;
    document.querySelectorAll(".player-0").forEach((element)=>{
        element.style.background = `linear-gradient(135deg,#${colors[0]},#${colors[2]})`;
    })
    document.querySelectorAll(".player-1").forEach((element)=>{
        element.style.background = `linear-gradient(135deg,#${colors[1]},#${colors[3]})`;
    })
    checkForWinner();
    if(!gameFinised){
        playerTurn = !playerTurn;
        turnInfo.innerHTML = `<h2>Player ${playerTurn*1+1} Turn</h2>`;
        turnInfo.style.color = `#${colors[playerTurn*1]}`;
    }
}

const checkForWinner = ()=>{
    //will change it to 2D array later

    //check rows
    for(let i = 0;i<9;i+=3) {
        cells[i] == cells[i+1] && cells[i] == cells[i+2] && cells[i] != null && declareWinner();
    }
    //check columns
    for(let i = 0;i<3;i++) {
        cells[i] == cells[i+3] && cells[i] == cells[i+6] && cells[i] != null && declareWinner();
    }
    //check diagonals
    cells[0] == cells[4] && cells[0] == cells[8] && cells[0] != null && declareWinner();
    cells[2] == cells[4] && cells[2] == cells[6] && cells[2] != null && declareWinner();
}
const play = ()=>{
    winnerInfo.style.display = "none";
    tut.style.display = "none";
    clearWindow();
    
}
const declareWinner = ()=>{
    winnerInfo.children[0].innerHTML = `Player ${playerTurn*1+1} Wins`;
    winnerInfo.children[0].style.color = `#${colors[playerTurn*1]}`;
    winnerInfo.style.display = "flex";
    gameFinised = true;
}
const onColorChange = (color)=>{
    const colorId = color.id.substr(1,1)*1;
    colors[colorId] = color.value.substr(1,6);
    turnInfo.style.color = `#${colors[playerTurn*1]}`;
    elementById("c0-label").style.color = `#${colors[0]}`;
    elementById("c1-label").style.color = `#${colors[1]}`
    document.querySelectorAll(".player-0").forEach((element)=>{
        element.style.background = `linear-gradient(135deg,#${colors[0]},#${colors[2]})`;
    })
    document.querySelectorAll(".player-1").forEach((element)=>{
        element.style.background = `linear-gradient(135deg,#${colors[1]},#${colors[3]})`;
    })
}
clearWindow();