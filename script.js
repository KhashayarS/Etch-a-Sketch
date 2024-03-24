let defaultNumberOfSquares = 16;
let container = document.querySelector(".container");


function clearBoard() {
    container.innerHTML = "";
}


function fixItemsStyle(squareSize) {
    let r = document.querySelector(":root");
    r.style.setProperty('--squaresPerSide', squareSize);
}


function generateRandomColor() {
    let newRed = Math.floor(256 * Math.random());
    let newGreen = Math.floor(256 * Math.random());
    let newBlue = Math.floor(256 * Math.random());

    let newColor = `rgb(${newRed}, ${newGreen}, ${newBlue}`;

    return newColor
}


function generateGrid(numberOfSquares) {

    fixItemsStyle(numberOfSquares);

    let totalSquares = numberOfSquares * numberOfSquares;

    for (let squareCounter=0; squareCounter < totalSquares; squareCounter++) {
        let newGridItem = document.createElement('div');
        newGridItem.classList.add('gridItem');
        container.appendChild(newGridItem);
    }
}


function activateItem(item, randomColors = true) {

    if (randomColors) {
        item.style.backgroundColor = generateRandomColor();
    } else {
        item.classList.add('active');
    }
}


function activateGrids() {

    let gridItems = document.querySelectorAll('.gridItem');
    
    container.addEventListener('mouseover', (event) => {
        let target = event.target;
        if (target.classList.contains('gridItem')) {
            activateItem(event.target);
        }
    })
    
}


function createCustomGrid() {

    let numOfSquares = NaN;
    while (
        isNaN(numOfSquares) ||
        typeof numOfSquares !== "number" ||
        numOfSquares > 100 ||
        numOfSquares < 2
    ) {
        numOfSquares = prompt("Please enter the number of sqaures per side!\nNumber should between 2 and 100"); 
        
        if (numOfSquares === null) {
            console.log(defaultNumberOfSquares);
            resetGrid();
            break;
        }

        numOfSquares = Number(numOfSquares); 
        defaultNumberOfSquares = numOfSquares;
    }
    
    if (!(numOfSquares === null)) {
        clearBoard();
        generateGrid(numOfSquares);
    }
}


function resetGrid() {
    clearBoard();
    generateGrid(defaultNumberOfSquares);
}


function startGame() {
    generateGrid(defaultNumberOfSquares);
    activateGrids();
}


startGame();
