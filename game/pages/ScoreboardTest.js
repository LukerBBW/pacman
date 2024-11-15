document.addEventListener("DOMContentLoaded", () => {
    const scoreboardDiv = document.getElementById("scoreboard");

            const data = JSON.parse(localStorage.getItem("ScoreBoardData"));

            // Sort the data array in descending order based on totalHighscore
            data.sort((a, b) => b.score - a.score);
            const table = document.createElement("table");
            const headerRow = document.createElement("tr");
            const rankHeader = document.createElement("th");
            const usernameHeader = document.createElement("th");
            const scoreHeader = document.createElement("th");
            rankHeader.textContent = "Rank";
            usernameHeader.textContent = "Username";
            scoreHeader.textContent = "Score";
            headerRow.appendChild(rankHeader);
            headerRow.appendChild(usernameHeader);
            headerRow.appendChild(scoreHeader);
            table.appendChild(headerRow);

            data.forEach((user, idx) => {
                const dataRow = document.createElement("tr");
                const rankData = document.createElement("td");
                const usernameData = document.createElement("td");
                const scoreData = document.createElement("td");
                rankData.textContent = idx + 1;
                usernameData.textContent = user.username;
                scoreData.textContent = user.score;
                dataRow.appendChild(rankData);
                dataRow.appendChild(usernameData);
                dataRow.appendChild(scoreData);
                table.appendChild(dataRow);
            });
            scoreboardDiv.appendChild(table);
        });

const detectKeyDown = (e) => {
    inputHandler(e.key);
};

const inputHandler = (key) => {
    if (key === "Enter"||key===" "||key==="e"||key==="r") {
        window.location.href = "/home";
    }
};
document.addEventListener("keydown", detectKeyDown, true);