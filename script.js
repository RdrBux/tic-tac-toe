const gameBoard = (() => {
  const _board = document.querySelector(".board");
  const displayBoard = () => {
    let _turn = 0;
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.classList.add("rows", `row${i}`);
      for (let j = 0; j < 3; j++) {
        const square = document.createElement("div");
        const squareValue = j + 1 + i * 3;
        square.classList.add("squares", `square${squareValue}`);

        square.addEventListener("click", function () {
          if (gamesPlayed % 2 === 0) {
            if (square.textContent === "") {
              square.textContent = _turn % 2 === 0 ? "x" : "o";
              let playerChoice = square.textContent;
              if (playerChoice === "x") {
                gameFlow.player1Choices.push(squareValue);
              } else {
                gameFlow.player2Choices.push(squareValue);
              }
              _turn++;
            }
          } else {
            if (square.textContent === "") {
              square.textContent = _turn % 2 === 0 ? "o" : "x";
              let playerChoice = square.textContent;
              if (playerChoice === "x") {
                gameFlow.player1Choices.push(squareValue);
              } else {
                gameFlow.player2Choices.push(squareValue);
              }
              _turn++;
            }
          }
          gameFlow.checkIfResult();
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

  return {
    displayBoard,
    clearBoard,
  };
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

  let player1Choices = [];
  let player2Choices = [];

  const _winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const checkIfResult = () => {
    for (let i = 0; i < 8; i++) {
      if (
        _winningCombinations[i].every((val) => player1Choices.includes(val))
      ) {
        console.log("player1 winner");
        _clearPlayerChoices();
      }
      if (
        _winningCombinations[i].every((val) => player2Choices.includes(val))
      ) {
        console.log("player2 winner");
        _clearPlayerChoices();
      }
      if (player1Choices.length === 5 || player2Choices.length === 5) {
        console.log("tie");
        _clearPlayerChoices();
      }
    }
  };

  const _clearPlayerChoices = () => {
    player1Choices.length = 0;
    player2Choices.length = 0;
  };

  return { player1Choices, player2Choices, checkIfResult };
})();

let gamesPlayed = 0;
gameBoard.displayBoard();

// TODO:
// ** clear Players choices when new game is clicked (or hide it during the game)
// ** add players score under their "piece"
