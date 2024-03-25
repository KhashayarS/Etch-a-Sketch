let currentNumberOfSquares = 16;
let container = document.querySelector(".container");

let globalOpacityCounter = 1;


function fixItemsStyle(squareSize) {
    let r = document.querySelector(":root");
    r.style.setProperty('--squaresPerSide', squareSize);
}


function clearBoard() {
    container.innerHTML = "";
}


function resetGrid() {
    globalOpacityCounter = 1;
    clearBoard();
    generateGrid(currentNumberOfSquares);
}


function generateRandomColor() {
    let newRed = Math.floor(256 * Math.random());
    let newGreen = Math.floor(256 * Math.random());
    let newBlue = Math.floor(256 * Math.random());

    let newColor = `rgb(${newRed}, ${newGreen}, ${newBlue}`;

    return newColor
}


function generateDarkeningColor(opacity=0) {
    let newColor = `rgba(0, 0, 0, ${opacity})`;
    
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


function activateItem(item, randomColors=false, darkeningColors=false) {
    
    if (randomColors) {

        item.style.backgroundColor = generateRandomColor();

    } else if (darkeningColors) {

        if (globalOpacityCounter < 10) {
            let opacityValue = globalOpacityCounter / 10;
            item.style.backgroundColor = generateDarkeningColor(opacityValue);
            globalOpacityCounter++;
        } else {
            item.style.backgroundColor = generateDarkeningColor(opacity=1);
        }

    } else {

        item.style.backgroundColor = null;
        item.classList.add('active');

    }
}


function removeContainerHandlers() {
    
    // Clone recursively
    let clonedContainer = container.cloneNode(true);

    try {
        container.parentNode.replaceChild(clonedContainer, container);
        container = clonedContainer;
    }
    catch (e) {}
}


function activateGridsHandler(randomColors, darkeningColors) {

    return function(event) {
        let target = event.target;
        if (target.classList.contains('gridItem')) {
            activateItem(target, randomColors, darkeningColors);
        }
    }
}


function activateGrids(randomColors=false, darkeningColors=false) {
    // Remove previous handlers so that they won't trigger mulitple times
    removeContainerHandlers();
    container.addEventListener('mouseover', activateGridsHandler(randomColors, darkeningColors));
    
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
            resetGrid();
            break;
        } else {
            numOfSquares = Number(numOfSquares); 
        }
    }

    
    if (!(numOfSquares === null)) {
        currentNumberOfSquares = numOfSquares;
        clearBoard();
        generateGrid(numOfSquares);
    }
}


function createNormalGrid() {
    resetGrid();
    activateGrids(randomColor=false, darkeningColor=false);
}

function createRandomGrid() {
    resetGrid();
    activateGrids(randomColor=true, darkeningColor=false);
}


function createProgressiveDarkeningGrid() {

    globalOpacityCounter = 0;
    resetGrid();
    activateGrids(randomColor=false, darkeningColor=true);

}


function startGame() {
    generateGrid(currentNumberOfSquares);
    createNormalGrid();
}


startGame();
