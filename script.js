let defaultNumberOfSquares = 50 * 50;
let container = document.querySelector(".container");

function generateGrid(numberOfSquares) {

    for (let squareCounter=0; squareCounter < numberOfSquares; squareCounter++) {
        let newGridItem = document.createElement('div');
        newGridItem.classList.add('gridItem');
        container.appendChild(newGridItem);
    }
}


function activateItem(item) {
    item.classList.add('active');
}

function activateGrids() {

    let gridItems = document.querySelectorAll('.gridItem');
    console.log(gridItems);
    
    container.addEventListener('mouseover', (event) => {
        activateItem(event.target);
    })
    
}


generateGrid(defaultNumberOfSquares);
activateGrids();
