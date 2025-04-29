



let LastRenderTime = 0;
const snake_spade = 5;
const gameBoard = document.getElementById("game-board");


function main(currentTime){
    if (gameOver){
        if(confirm("you lost . pass ok to restrt")){
            // window.location = "/"
            window.location.reload();
        }
        return;
    }
    

    window.requestAnimationFrame(main);
    const secondsRander = (currentTime - LastRenderTime) / 1000;
    if(secondsRander < 1 / snake_spade) return ;


    LastRenderTime = currentTime;

    update()
    draw()
};


window.requestAnimationFrame(main)

const SnakBody = [
    {x: 10, y: 11},
];


function updatsnake(){
    addSegments();

    let inputsderection = GetInputDrection()
    for(let i = SnakBody.length - 2 ; i >= 0 ; i--){
        SnakBody[i + 1] = {...SnakBody[i]}
    }

    SnakBody[0].x += inputsderection.x;
    SnakBody[0].y += inputsderection.y;
}


function drawsnak(gameBoard){

    SnakBody.forEach((egmant) =>{
        const snakElement = document.createElement("div");
        snakElement.style.gridColumnStart = egmant.x;
        snakElement.style.gridRowStart = egmant.y;
        snakElement.classList.add("snake");
        gameBoard.appendChild(snakElement);
    })
}



function update(){
    updatsnake()
    updatFood()
    chekDeath()
}

function draw(){
    gameBoard.innerHTML = "";
    drawsnak(gameBoard);
    drawFood(gameBoard)
}


//  input for user


let inputDerection = {x: 0, y: 0};
let lastInputDerection = {x: 0, y: 0};



window.addEventListener("keydown", (e) => {
    switch(e.key){
        case "ArrowUp":
            if (lastInputDerection.y !== 0) break
            inputDerection = {x: 0, y: -1};
         break;
        case "ArrowDown":
            if (lastInputDerection.y !== 0) break;
            inputDerection = {x: 0, y: 1};
         break;
        case "ArrowLeft":
            if (lastInputDerection.x !== 0) break;
            inputDerection = {x: -1, y: 0};
         break;
        case "ArrowRight":
            if (lastInputDerection.x !== 0) break;
            inputDerection = {x: 1, y: 0};
         break;
        
    }
})

function GetInputDrection(){
    lastInputDerection = inputDerection
    return inputDerection;
}



// foode of snak


let food = randomFood();
const expansion_rait = 1;
let newSegments = 0;
let gameOver = false;


function expandsnake(amount){
    newSegments += amount;
}

function onSnake(position, { egnoreHead = false } = {}){
    return SnakBody.some((egmant, index) => {
        if (egnoreHead && index === 0) return false;
        return equalPsitions(egmant, position);
    });
};

function equalPsitions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y;
}


 
function updatFood(){
    if (onSnake(food)){
        expandsnake(expansion_rait);
        food = randomFood();
    }
}


function drawFood(gameBoard){
        const foodElement = document.createElement("div");
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.gridRowStart = food.y;
        foodElement.classList.add("food");
        gameBoard.appendChild(foodElement);
}




function addSegments(){
    for (let i = 0 ; i < newSegments ; i++){
        SnakBody.push({...SnakBody[SnakBody.length - 1]})
    }

    newSegments = 0;
}


function randomFood(){
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPsition();
    };

    return newFoodPosition;
};



function randomGridPsition(){
    return{
        x: Math.floor(Math.random() * 21) + 1,
        y: Math.floor(Math.random() * 21) + 1,
    }; 
}



function chekDeath(){
    gameOver = outSideGrid(getSnakHead()) || snakIntersection()
}



function outSideGrid(position){
    return position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21
}


function getSnakHead(){
    return SnakBody[0];
}

function snakIntersection(){
    return onSnake(SnakBody[0], {egnoreHead: true});
}










































































































