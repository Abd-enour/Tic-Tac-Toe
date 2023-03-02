let gameBoard=document.getElementById('game-board');
let cellElement =document.querySelectorAll('#game-board button');
let winingMessage=document.getElementById('winning-message');
let itemSign=document.querySelectorAll(".item-sign");
let itemSignX=document.getElementById("item-sign-x");
let itemSignO=document.getElementById("item-sign-o");
let restartBtn=document.getElementById("play-again");
let WINING_COMBINATION =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let circleTurn;
itemSign.forEach(item =>{
    item.addEventListener('click',signPicker,false);
})
function signPicker(e){
    restartGame();
    startGame();
    itemSignX.classList.remove('highlighted');
    itemSignO.classList.remove('highlighted');
    let userSign=e.target;
    userSign.classList.add('highlighted');
    if(userSign.textContent==="X"){
        circleTurn=false;
        setBoardHoverClass();

    }else{
        circleTurn=true;
        setBoardHoverClass();
    }
}

function checkWinner(currentClass){
   return WINING_COMBINATION.some((combination)=>{
    return combination.every(index=>{
        return cellElement[index].classList.contains(currentClass)
    })
   })
}
function startGame(){
cellElement.forEach(btn=>{
    btn.addEventListener('click',clickHandler,{once:true})
})
}


function clickHandler(e){
    let cell=e.target;
    let currentClass= circleTurn? "circle": "x";
    placeMarker(cell,currentClass)
    if(checkWinner(currentClass)){
        endGame(false)   
    }else if (isDraw()){
        endGame(true)
    }else{
        swapTurn();
        setBoardHoverClass();
    }
}
function isDraw(){
    return [...cellElement].every(cell =>{
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}
function endGame(draw){
    if(draw){
        winingMessage.innerHTML=`Draw!`
    }else{
        winingMessage.innerHTML=`${circleTurn?"O's":"X's"} Wins!`
    }
    winingMessage.classList.add('show');
}

function placeMarker(cell,currentClass){
    cell.classList.add(currentClass);
}
function swapTurn(){
    circleTurn=!circleTurn;
}

function setBoardHoverClass(){
    gameBoard.classList.remove('x');
    gameBoard.classList.remove('circle');
    if(circleTurn){
    gameBoard.classList.add('circle');
    }else{
    gameBoard.classList.add('x');
    }
}

restartBtn.addEventListener('click',restartGame)
function restartGame(){
    cellElement.forEach(btn=>{
        btn.removeEventListener('click',clickHandler);
        gameBoard.classList.remove('x');
        gameBoard.classList.remove('circle');
        btn.classList.remove('x');
        btn.classList.remove('circle');
        winingMessage.classList.remove('show');
        winingMessage.textContent="";
        itemSign.forEach(item=>{
            item.classList.remove("highlighted")
        })
        circleTurn;
    })
}