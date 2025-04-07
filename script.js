// VARIABLES
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "color";

const sketchContainer = document.getElementById("sketchContainer");
const colorPicker = document.getElementById("color-picker");
const btnColorMode = document.getElementById("btn-color-mode");
const btnRainbowMode = document.getElementById("btn-rainbow-mode");
const btnEraserMode = document.getElementById("btn-eraser-mode");
const btnResetGrid = document.getElementById("btn-reset-grid");
const btnSetGridSize = document.getElementById("btn-set-grid-size");

// Initialize default values
let gridSize = DEFAULT_GRID_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let isSketching = false;
btnColorMode.classList.add("active-state");

// FUNCTIONS
function setColor() {
    if (currentMode === "color") {
        currentColor = colorPicker.value;
    }

    else if (currentMode === "rainbow") {
        const hexadecimal = "0123456789ABCDEF";
        let randomColor = "#";

        for (let i = 0; i < 6; i++) {
            randomColor += hexadecimal[Math.floor(Math.random() * 16)];
        }
        currentColor = randomColor;
    }

    else if (currentMode === "eraser") {
        currentColor = "transparent";
    }

    return currentColor;
}

function setGrid(size) {
    const blockSize = 640 / size;

    for (let i = 0; i < size * size; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.width = `${blockSize}px`;
        block.style.height = `${blockSize}px`;
        block.setAttribute("draggable", false);

        // DOM Sketch feature
        block.addEventListener("mousedown", () => {
            isSketching = true;
            block.style.backgroundColor = setColor();
        });

        block.addEventListener("mouseover", () => {
            if (isSketching) {
                block.style.backgroundColor = setColor();
            }
        });

        sketchContainer.appendChild(block);
    }
}

function resetGrid() {
    sketchContainer.innerHTML = "";
    setGrid(gridSize);
}

// DOM
document.addEventListener("mouseup", () => {
    isSketching = false;
});

colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

btnColorMode.addEventListener("click", () => {
    currentMode = "color";
    btnColorMode.classList.add("active-state");
    btnRainbowMode.classList.remove("active-state");
    btnEraserMode.classList.remove("active-state");
});

btnRainbowMode.addEventListener("click", () => {
    currentMode = "rainbow";
    btnColorMode.classList.remove("active-state");
    btnRainbowMode.classList.add("active-state");
    btnEraserMode.classList.remove("active-state");
});

btnEraserMode.addEventListener("click", () => {
    currentMode = "eraser";
    btnColorMode.classList.remove("active-state");
    btnRainbowMode.classList.remove("active-state");
    btnEraserMode.classList.add("active-state");
});

btnResetGrid.addEventListener("click", () => {
    resetGrid();
});

btnSetGridSize.addEventListener("click", () => {
    let userInput = prompt("Enter grid size: ");

    // If user clicks cancel
    if (userInput === null) {
        return;
    }

    else if (Number.isInteger(Number(userInput)) && Number(userInput) > 0 && Number(userInput) <= 100) {
        gridSize = parseInt(userInput);
        resetGrid(gridSize);
    }
    
    else {
        alert("Please enter a number from 1 to 100 only.");
    }
});

// Main
setGrid(gridSize);