document.addEventListener("DOMContentLoaded", () => {
    const keyboardDiv = document.createElement("div");
    keyboardDiv.className = "keyboard";

    const row1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", "_", "Delete"];
    const row2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
    const row3 = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const row4 = ["Done", "", "", "", "", "", "", "", "", "", "", "", ""];
    const columns = [row2, row3, row1, row4];

    const nav = (path) => window.location.href = path;

    columns.forEach((col, colIndex) => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";
        col.forEach((letter) => {
            const letterDiv = document.createElement("div");
            letterDiv.innerHTML = `<h1>${letter}</h1>`;
            rowDiv.appendChild(letterDiv);
        });
        keyboardDiv.appendChild(rowDiv);
    });

    document.body.appendChild(keyboardDiv);

    let x = 0;
    let y = 0;
    let selectedLetter = "A";
    let username = "";
    const selectedUsernameSpan = document.getElementById("selectedUsername");

    const updateLetterStyle = () => {
        selectedLetter = columns[x][y];
        if (x === 4) {
            selectedLetter = "Done"
        }
        const rows = document.querySelectorAll(".keyboard .row");
        rows.forEach((row, rowIndex) => {
            const letters = row.querySelectorAll("div");
            letters.forEach((letter, letterIndex) => {
                if (rowIndex === x && letterIndex === y) {
                    if (x === 4) {
                        columns[x][1].classList.add("selected");
                    }
                    letter.classList.add("selected");
                } else {
                    letter.classList.remove("selected");
                }
            });
        });
    };

    const updateSelectedUsername = () => {
        selectedUsernameSpan.textContent = username;
    };

    const handleSelection = () => {
        if (selectedLetter === "Delete") {
            username = username.slice(0, -1);
        } else if (selectedLetter === "Done") { // Füge Bedingung hinzu, um Done auszuwählen, wenn die ganz linke Spalte ausgewählt wird
            if (username.length !== 0) {
                sendData(username)
            }
        } else {
            if (username.length <= 10) {
                username += selectedLetter;
            }
        }
        updateSelectedUsername(); // Aktualisierung des angezeigten Benutzernamens
    };

    const detectKeyDown = (e) => {
        inputHandler(e.key);
    };

    const inputHandler = (key) => {
        if (key === "w" || key === "ArrowUp") {
            y = Math.max(y - 1, 0);
        } else if (key === "s" || key === "ArrowDown") {
            y = Math.min(y + 1, columns[x].length - 1);
        } else if (key === "d" || key === "ArrowRight") {
            if (x === 2) {
                x = Math.min(x + 2, columns.length - 1);
                y = 0
            } else {
                x = Math.min(x + 1, columns.length - 1);
            }
        } else if (key === "a" || key === "ArrowLeft") {
            x = Math.max(x - 1, 0);
        } else if (key === "Enter" || key === " " || key === "e" || key === "r") {
            handleSelection();
        }
        updateLetterStyle();
    };
    updateLetterStyle();

    function sendData(data) {

        const existingData = JSON.parse(localStorage.getItem("ScoreBoardData")) || []
        localStorage.setItem("username", data)
        localStorage.setItem("levels", 0);
        localStorage.setItem("skinId", 1)
        localStorage.setItem("totalScore", 0)
        sessionStorage.setItem("isLoggedIn", true)
        //Nächster User pushen

        existingData.push({"username": username, "score": 0});
        localStorage.setItem("ScoreBoardData", JSON.stringify(existingData))

        nav("./levelOverview.html");
    }

    document.addEventListener("keydown", detectKeyDown);
});