"use strict";
// JM, 07/25/2024

const BODY = document.querySelector("body");
const CONTAINER = document.querySelector("#container");

let containerHeight = Math.floor(window.innerHeight * 0.7);

let getUserInput = () => {
    return Number(prompt("What size should the new grid be? (Max: 100, 1:1 aspect ratio)")) || 16;
}

let randomColor = (box) => {
    const RANDOM_COLOR = `
    rgba(
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)}
    `;
    let randomColorAndOpacity = `${RANDOM_COLOR}, 1)`;

    if (box.getAttribute("data-opacity") < 1) {
        const NEW_OPACITY = (+box.getAttribute("data-opacity") + 0.1).toFixed(1);
        box.setAttribute("data-opacity", NEW_OPACITY);
        randomColorAndOpacity = `${RANDOM_COLOR}, ${NEW_OPACITY})`;
    } else {
        box.setAttribute("data-opacity", 1);
        randomColorAndOpacity = `${RANDOM_COLOR}, 1)`;
    }
    return randomColorAndOpacity;
}

let makeGrid = (size) => {
    if (size > 100) size = 100;
    if (document.querySelectorAll(".tiles") !== undefined) {
        document.querySelectorAll(".tiles").forEach((node) => node.remove());
    }

    const BOX_SIZE = (containerHeight / size);
    CONTAINER.style.height = BOX_SIZE * size + 2 + "px";

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const BOX = document.createElement("div");
            BOX.classList.add("tiles");
            BOX.setAttribute("data-opacity", 0);
            BOX.style.cssText = 
            `
                flex: 1 1 ${100 / size}%;
            `;
            CONTAINER.append(BOX);
        }
    }

    CONTAINER.addEventListener("mouseover", (e) => {
        if (e.target.id === "container") return;
        e.target.style.backgroundColor = randomColor(e.target);
    });
}

let shake = () => {
    document.querySelectorAll(".tiles").forEach((node) => node.style.backgroundColor = "white");
}

const NEW_GRID = document.createElement("button");
NEW_GRID.textContent = "Create New Grid";
NEW_GRID.addEventListener("click", () => makeGrid(getUserInput()));
BODY.prepend(NEW_GRID);

makeGrid(16);

const SHAKE = document.createElement("button");
SHAKE.textContent = "Shake!";
SHAKE.addEventListener("click", () => shake());
BODY.append(SHAKE);