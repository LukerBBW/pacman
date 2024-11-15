const content = document.getElementById("lockerContent");

let selectedRow;
let selectedCol;
let selected;
let col1 = [];
let col2 = [];
let col3 = [];
let rows = [col1, col2, col3];

const classicPac = document.getElementById("classicPacMan");
const navBack = document.getElementById("navBack");

loadSkins();

function createElements(skins) {
    skins.forEach((skin, idx) => {
        const skinContainer = document.createElement("div");
        skinContainer.classList.add("skinContainer");

        const skinShowImg = document.createElement("img");
        skinShowImg.classList.add("skinImg");
        skinShowImg.src = "../images/skins/pacmanSkin" + (idx + 2).toString() + "_1.png";
        skinContainer.appendChild(skinShowImg);

        const skinTitle = document.createElement("p");
        skinTitle.classList.add("skinTitle");
        skinTitle.innerHTML = skin;
        skinContainer.appendChild(skinTitle);

        content.appendChild(skinContainer);
        if (idx < 3) {
            col1.push(skinContainer);
        } else if (idx >= 3 && idx < 6) {
            col2.push(skinContainer);
        } else {
            col3.push(skinContainer);
        }
    });
    setInitialSelection(); // Call setInitialSelection after skins are loaded
}

function loadSkins() {
    const skinArray=["Krümelmonster","EvilMan","PicMan","AngryMan","SwissPac","Chomp","Kirby","Globall","Pokeball"]
    createElements(skinArray)
}

function inputHandler(key) {
    if (key === "s" || key === "ArrowDown") {
        selectedRow = Math.min(selectedRow + 1, 5);
    } else if (key === "w" || key === "ArrowUp") {
        selectedRow = Math.max(selectedRow - 1, 1);
    } else if (key === "d" || key === "ArrowRight") {
        selectedCol = Math.min(selectedCol + 1, 3);
    } else if (key === "a" || key === "ArrowLeft") {
        selectedCol = Math.max(selectedCol - 1, 1);
    } else if (key === "Enter"||key===" "||key==="e"||key==="r") {
        selectionHandler();
    }
    updateButtonStyles();
}

function updateButtonStyles() {
    rows.forEach((row, idx) => {
        row.forEach((field, idx2) => {
            if (selectedRow !== 4) {
                if (selectedRow !== 5) {
                    if (selectedRow === idx + 1 && selectedCol === idx2 + 1) {
                        field.classList.add("selected");
                        navBack.classList.remove("selected-text");
                        classicPac.classList.remove("selected-text");
                            field.classList.add("choosenSkin");
                    } else {
                        field.classList.remove("selected");
                        navBack.classList.remove("selected-text");
                        classicPac.classList.remove("selected-text");
                    }
                } else {
                    navBack.classList.add("selected-text");
                    field.classList.remove("selected");
                    classicPac.classList.remove("selected-text");
                }
            } else {
                navBack.classList.remove("selected-text");
                field.classList.remove("selected");
                classicPac.classList.add("selected-text");
            }
        });
    });
}

function setInitialSelection() {
    selectedRow = 1;
    selectedCol = 1;
    updateButtonStyles();
}

function selectionHandler() {
    if (selectedRow === 4) {
        localStorage.setItem("skinId", 1);
    } else if (selectedRow === 5) {
        window.location.href = "/";
    } else {
        if (selectedRow === 1) {
            localStorage.setItem("skinId", selectedCol + 1);
        } else if (selectedRow === 2) {
            localStorage.setItem("skinId", selectedCol + 4);
        } else if (selectedRow === 3) {
            localStorage.setItem("skinId", selectedCol + 7);
        }
    }
}

function detectKeyDown(e) {
    inputHandler(e.key);
}

document.addEventListener("keydown", detectKeyDown);