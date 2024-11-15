function GameInstructions() {
    const nav = () => {
        window.location.href = "home.html";
    };

    const detectKeyDown = (e) => {
        inputHandler(e.key);
    };

    const inputHandler = (key) => {
        if (key === "Enter"||key===" "||key==="e"||key==="r") {
            nav();
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.addEventListener("keydown", detectKeyDown, true);

        const itemsDiv = document.getElementById("items");

        const instructionsDiv = document.createElement("div");
        instructionsDiv.id = "items";

        const h1 = document.createElement("h1");
        h1.textContent = "Game Instructions - Pacman";

        const h3_1 = document.createElement("h3");
        h3_1.textContent =
            "Welcome to the classic Pacman game! The objective of the game is to control Pacman, the yellow circle, and guide it through the maze to eat all the dots while avoiding the ghosts.";

        const h3_controls = document.createElement("h3");
        h3_controls.textContent = "Controls:";

        const ul_controls = document.createElement("ul");
        const li_controls = document.createElement("li");
        const li_controls2 = document.createElement("li");

        li_controls.innerHTML = "Use the <strong>Joystick</strong> to move Pacman Up, Down, Left, and Right.";
        li_controls2.innerHTML = "You can press <strong>any Button</strong> to select an option.";
        ul_controls.appendChild(li_controls);
        ul_controls.appendChild(li_controls2);


        const h3_gameplay = document.createElement("h3");
        h3_gameplay.textContent = "Gameplay:";

        const ul_gameplay = document.createElement("ul");
        const li1_gameplay = document.createElement("li");
        li1_gameplay.textContent = "Eat all the dots in the maze to complete the level.";
        const li2_gameplay = document.createElement("li");
        li2_gameplay.textContent = "Avoid the ghosts; if Pacman collides with a ghost, you lose a life.";
        const li3_gameplay = document.createElement("li");
        li3_gameplay.textContent = "If you eat a power pellet, you can temporarily turn the tables and eat the ghosts for extra points.";
        const li4_gameplay = document.createElement("li");
        li4_gameplay.textContent = "The game ends when you die.";
        ul_gameplay.appendChild(li1_gameplay);
        ul_gameplay.appendChild(li2_gameplay);
        ul_gameplay.appendChild(li3_gameplay);
        ul_gameplay.appendChild(li4_gameplay);

        const h3_enjoy = document.createElement("h3");
        h3_enjoy.textContent = "Enjoy the game and have fun!";

        const h2_backToMenu = document.createElement("h2");
        h2_backToMenu.className = "selected-text";
        h2_backToMenu.textContent = "Back to menu";
        h2_backToMenu.addEventListener("click", nav);

        instructionsDiv.appendChild(h1);
        instructionsDiv.appendChild(h3_1);
        instructionsDiv.appendChild(h3_controls);
        instructionsDiv.appendChild(ul_controls);
        instructionsDiv.appendChild(h3_gameplay);
        instructionsDiv.appendChild(ul_gameplay);
        instructionsDiv.appendChild(h3_enjoy);
        instructionsDiv.appendChild(h2_backToMenu);

        itemsDiv.appendChild(instructionsDiv);
    });
}

GameInstructions();
