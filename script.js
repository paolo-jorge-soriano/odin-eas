const sketchContainer = document.getElementById("sketchContainer");
const gridSize = 16; // temporary only. convert to function later

let isSketching = false;

function setGrid(size) {
    sketchContainer.innerHTML = "";
    const blockSize = 640 / size;

    for (let i = 0; i < size * size; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.width = `${blockSize}px`;
        block.style.height = `${blockSize}px`;

        block.addEventListener("mousedown", () => {
            isSketching = true;
            block.style.backgroundColor = "black";
        });

        block.addEventListener("mouseover", () => {
            if (isSketching) {
                block.style.backgroundColor = "black";
            }
        });

        sketchContainer.appendChild(block);
    }
}

document.addEventListener("mouseup", () => {
    isSketching = false;
});

// Main
setGrid(gridSize);