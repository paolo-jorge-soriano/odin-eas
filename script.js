// VARIABLES
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "color";

const sketchContainer = document.getElementById("sketchContainer");
const colorPicker = document.getElementById("color-picker");
const btnResetGrid = document.getElementById("btn-reset-grid");
const btnColorMode = document.getElementById("btn-color-mode");
const btnRainbowMode = document.getElementById("btn-rainbow-mode");

// Initialize default values
let gridSize = DEFAULT_GRID_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let isSketching = false;

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
btnColorMode.addEventListener("click", () => {
    currentMode = "color";
});

btnRainbowMode.addEventListener("click", () => {
    currentMode = "rainbow";
});

colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

document.addEventListener("mouseup", () => {
    isSketching = false;
});

btnResetGrid.addEventListener("click", () => {
    resetGrid();
});

// Main
setGrid(gridSize);