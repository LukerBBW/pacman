document.addEventListener("DOMContentLoaded", () => {
  const optionsDiv = document.getElementById("options");
  const buttons = optionsDiv.querySelectorAll("div h1"); // Select only h1 elements within div
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    logout()
  }

  const nav = (path) => window.location.href = path;

  let selected = 1;
  const maxOptions = 5;

  function updateButtonStyles() {
    buttons.forEach((button, index) => {
      if (index + 1 === selected) {
        button.classList.add("selected-text");
      } else {
        button.classList.remove("selected-text");
      }

    });
  }

  function selectionHandler() {

    if (selected === 1) {

      if (localStorage.getItem("username")) {
        nav("./levelOverview.html")

      } else {
        nav("./LoginTest.html");
      }

    } else if (selected === 2) {
      nav("./ScoreboardTest.html");
    } else if (selected === 3) {
      nav("./locker.html");
    } else if (selected === 4) {
      nav("./instructionsTest.html");
    } else if (selected === 5) {
      logout();
    }
  }

  function inputHandler(key) {
    if (key === "s" || key === "ArrowDown") {
      selected = Math.min(selected + 1, maxOptions);
    } else if (key === "w" || key === "ArrowUp") {
      selected = Math.max(selected - 1, 1);
    } else if (key === "Enter" || key === " " || key === "e" || key === "r") {
      selectionHandler();
    }
    updateButtonStyles();
  }


  function logout() {
    localStorage.removeItem("username");
    localStorage.setItem("skinId", 1);
    localStorage.setItem("levels", 0);
    localStorage.setItem("score", 0);
    localStorage.setItem("totalScore", 0);
    sessionStorage.setItem("isLoggedIn", false)

  }

  function detectKeyDown(e) {
    inputHandler(e.key);
  }

  document.addEventListener("keydown", detectKeyDown);
  // Initial button style update
  updateButtonStyles();
});
