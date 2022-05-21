const gameBoard = (() => {
  const _board = document.querySelector(".board");
  const displayBoard = () => {
    let _turn = 0;
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.classList.add("rows", `row${i}`);
      for (let j = 0; j < 3; j++) {
        const square = document.createElement("div");
        square.classList.add("squares", `square${j + 1 + i * 3}`);

        square.addEventListener("click", function () {
          if (gamesPlayed % 2 === 0) {
            if (square.textContent === "") {
              square.textContent = _turn % 2 === 0 ? "x" : "o";
              _turn++;
            }
          } else {
            if (square.textContent === "") {
              square.textContent = _turn % 2 === 0 ? "o" : "x";
              _turn++;
            }
          }
        });

        row.appendChild(square);
      }
      _board.appendChild(row);
    }
  };

  const clearBoard = () => {
    const row = document.getElementsByClassName("rows");
    while (row.length > 0) {
      row[0].parentNode.removeChild(row[0]);
    }
  };

  return { displayBoard, clearBoard };
})();

const Player = (name) => {
  const getName = () => {};
  const playerScore = () => {};
};

const gameFlow = (() => {
  const btn = document.getElementById("js-new-game");
  btn.addEventListener("click", () => {
    gameBoard.clearBoard();
    gameBoard.displayBoard();
    gamesPlayed++;
  });
  return {};
})();

let gamesPlayed = 0;
gameBoard.displayBoard();
