"user strict";
// JM, 07/25/2024

const CONTAINER = document.querySelector("#container");
let containerWidth = Math.floor(window.innerWidth * 0.5);
let containerHeight = Math.floor(window.innerHeight * 0.7);

let makeGrid = (height, width) => {
    if (height > 100) height = 100;
    if (width > 100) width = 100;

    const BOX_WIDTH = Math.floor(containerWidth / width) + "px";
    const BOX_HEIGHT = Math.floor(containerHeight / height) + "px";

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const BOX = document.createElement("div");
            BOX.classList.add("tiles");
            BOX.style.cssText = 
            `
                flex: ${BOX_HEIGHT};
                aspect-ratio: ${height} / ${width};
            `;
            CONTAINER.append(BOX);
        }
    }
    CONTAINER.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = "black";
    });
}

makeGrid(16, 16);