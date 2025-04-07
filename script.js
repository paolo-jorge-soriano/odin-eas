const DEFAULT_GRID_SIZE = 16;

const sketchContainer = document.getElementById("sketchContainer");
const colorPicker = document.getElementById("colorPicker");

let gridSize = DEFAULT_GRID_SIZE;
let currentColor = colorPicker.value;
let isSketching = false;

function setGrid(size) {
    const blockSize = 640 / size;

    for (let i = 0; i < size * size; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.width = `${blockSize}px`;
        block.style.height = `${blockSize}px`;
        block.setAttribute("draggable", false);

        // Sketch feature
        block.addEventListener("mousedown", () => {
            isSketching = true;
            block.style.backgroundColor = currentColor;
        });

        block.addEventListener("mouseover", () => {
            if (isSketching) {
                block.style.backgroundColor = currentColor;
            }
        });

        sketchContainer.appendChild(block);
    }
}

function clearGrid() {
    sketchContainer.innerHTML = "";
    setGrid(gridSize);
}

colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

document.addEventListener("mouseup", () => {
    isSketching = false;
});

// Initialize default state
setGrid(DEFAULT_GRID_SIZE);