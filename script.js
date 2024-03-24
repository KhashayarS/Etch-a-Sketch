let defaultNumberOfSquares = 16;
let container = document.querySelector(".container");

let globalOpacityCounter = 1;


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


function generateDarkeningColor(opacity=0) {
    let newColor = `rgba(128, 128, 128, ${opacity})`;
    console.log(newColor);
    
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
            let opacityValue = (1 - globalOpacityCounter / 10);
            console.log(opacityValue);
            item.style.backgroundColor = generateDarkeningColor(opacityValue);
            globalOpacityCounter++;
        } else {
            item.style.backgroundColor = generateDarkeningColor(opacity=0);
        }
    }else {
        item.style.backgroundColor = null;
        item.classList.add('active');
    }
}


function activateGrids(randomColors=false, darkeningColors=false) {

    let gridItems = document.querySelectorAll('.gridItem');
    
    container.addEventListener('mouseover', (event) => {
        let target = event.target;
        if (target.classList.contains('gridItem')) {
            activateItem(event.target, randomColors, darkeningColors);
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


function resetGrid() {
    globalOpacityCounter = 0;
    clearBoard();
    generateGrid(defaultNumberOfSquares);
}


function startGame() {
    generateGrid(defaultNumberOfSquares);
    createNormalGrid();
}



startGame();
