const lockClosedURL = "/images/lockClosed.png";
const lockOpenURL = "/images/lockOpen.png";

let l1unlocked = true;
let l2unlocked = false;
let l3unlocked = false;
let l4unlocked = false;

let lockedLvls=[]

const unlockedLevels = parseInt(localStorage.getItem("levels"));

let selectedRow=1;
let selectedCol=1;


const createLevelElement = (title, unlocked) => {
    const level = document.createElement("div");
    level.classList.add("lvl");

    const levelTitle = document.createElement("h1");
    levelTitle.classList.add("lvlTitle");
    levelTitle.innerHTML = title;
    level.appendChild(levelTitle);

    const levelImg = document.createElement("img");
    levelImg.src = unlocked ? lockOpenURL : lockClosedURL;
    levelImg.classList.add(unlocked ? "open" : "closed");
    level.appendChild(levelImg);

    return level;
};

function unlockImg() {

     if (unlockedLevels === 1) {
        l1unlocked = true;
        l2unlocked = true;

    } else if (unlockedLevels === 2) {
        l1unlocked = true;
        l2unlocked = true;
        l3unlocked = true;

    }else   if (unlockedLevels === 3) {
         l1unlocked = true;
         l2unlocked = true;
         l3unlocked = true;
         l4unlocked = true;
     }
}

unlockImg()


const level1 = createLevelElement("level 1", l1unlocked);

level1.classList.add("selected-lvl")
const level2 = createLevelElement("level 2", l2unlocked);
const level3 = createLevelElement("level 3", l3unlocked);
const level4 = createLevelElement("level 4", l4unlocked);

const navBack= document.getElementById("navBack")


let unlockedFields = [level1]; // Create the array after defining the level elements

unlock();

function unlock() {
if (unlockedLevels === 1) {
        l1unlocked = true;
        l2unlocked = true;
        unlockedFields.push(level2); // Push level2 to the unlockedFields array
    lockedLvls.push(level3, level4)

} else if (unlockedLevels === 2) {
        l1unlocked = true;
        l2unlocked = true;
        l3unlocked = true;
        unlockedFields.push(level2, level3); // Push level2 and level3 to the unlockedFields array
    lockedLvls.push( level4)
    }else   if (unlockedLevels === 3) {
    l1unlocked = true;
    l2unlocked = true;
    l3unlocked = true;
    l4unlocked = true;
    unlockedFields.push(level4);
}else{
    lockedLvls.push(level2,level3,level4)
}

const row1=[level1,level2,level3, level4]
    const row2=[navBack]
     rows=[row1,row2]

}

colorLockedLvl()
function colorLockedLvl(){
    lockedLvls.forEach((lvl, idx)=>{
        lvl.classList.add("locked-lvl")
    })
}


function inputHandler(key) {
    if (key === "s" || key === "ArrowDown") {
        selectedRow = Math.min(selectedRow + 1, 2);
    } else if (key === "w" || key === "ArrowUp") {
        selectedRow = Math.max(selectedRow - 1, 1);
    } else if (key === "d" || key === "ArrowRight") {
        selectedCol = Math.min(selectedCol + 1, 4); // Erhöhen Sie die Anzahl der Spalten auf 4
    } else if (key === "a" || key === "ArrowLeft") {
        selectedCol = Math.max(selectedCol - 1, 1);
    } else if (key === "Enter"||key===" "||key==="e"||key==="r") {
        selectionHandler();
    }
    updateButtonStyles();
}

function updateButtonStyles() {
    const contents = document.querySelectorAll(".lvl");
    contents.forEach((button, index) => {
        const row = Math.ceil((index + 1) / 4); // Ändern Sie die Spaltenanzahl hier auf 4
        const col = (index + 1) % 4 || 4;
if(selectedRow===1){
    if (row === selectedRow && col === selectedCol) {
        button.classList.add("selected-lvl");
        navBack.classList.remove("selected-text");

    } else {
        button.classList.remove("selected-lvl");
        navBack.classList.remove("selected-text");
    }
}else{
    navBack.classList.add("selected-text")
    button.classList.remove("selected-lvl");
}

    });
}




function selectionHandler() {

    if (selectedRow === 1) {
        if (selectedCol === 1 && l1unlocked) {
            // Navigate to lvl1

            localStorage.setItem("selectedLvl",0)
            window.location.href = "game/index.html";

        } else if (selectedCol === 2 && l2unlocked) {
            // Navigate to lvl2
            localStorage.setItem("selectedLvl",1)
            window.location.href = "game/index.html";
        } else if (selectedCol === 3 && l3unlocked) {
            // Navigate to lvl3
            localStorage.setItem("selectedLvl",2)
            window.location.href = "game/index.html";
        }else if (selectedCol === 4 && l4unlocked) {
            // Navigate to lvl3
            localStorage.setItem("selectedLvl",3)
            window.location.href = "game/index.html";
        }
    } else {
       window.location.href="home.html"
    }
}



function detectKeyDown(e) {
    inputHandler(e.key);
}

document.addEventListener("keydown", detectKeyDown);

const levelsContainer = document.getElementById("levels");
levelsContainer.appendChild(level1);
levelsContainer.appendChild(level2);
levelsContainer.appendChild(level3);
levelsContainer.appendChild(level4);
