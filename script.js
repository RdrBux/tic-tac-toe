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
          if (gamesPlayed % 2 !== 0) {
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

const Player = () => {
  let _score = 0;

  const displayPlayers = () => {
    const playersDiv = document.getElementsByClassName("player");
    playersDiv[0].style.display = "block";
    playersDiv[1].style.display = "block";
  };

  const name = (player) => {
    const pldisplay = document.querySelector(`.${player}`);
    const plname = prompt(
      `Please enter ${player === "player1" ? "first" : "second"} player name`,
      "Player"
    );
    pldisplay.textContent = plname;
  };

  const addScore = (player) => {
    const plscore = document.querySelector(`.${player}-score`);
    _score++;
    plscore.textContent = _score;
  };

  return { displayPlayers, name, addScore };
};

const gameFlow = (() => {
  const winnerDiv = document.querySelector(".winner");

  const btn = document.getElementById("js-new-game");
  btn.addEventListener("click", () => {
    if (gamesPlayed === 0) {
      player1.name("player1");
      player2.name("player2");
      player1.displayPlayers();
    }
    gameBoard.clearBoard();
    gameBoard.displayBoard();
    gamesPlayed++;
    winnerDiv.textContent = "";
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
        _clearPlayerChoices();
        player1.addScore("player1");
        winnerDiv.textContent = "Player 1 wins";
      }
      if (
        _winningCombinations[i].every((val) => player2Choices.includes(val))
      ) {
        _clearPlayerChoices();
        player2.addScore("player2");
        winnerDiv.textContent = "Player 2 wins";
        winnerDiv.style.color = "red";
      }
      if (player1Choices.length === 5 || player2Choices.length === 5) {
        _clearPlayerChoices();
        winnerDiv.textContent = "It's a tie";
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
const player1 = Player();
const player2 = Player();

/* TODO:
 ** remove input when a player wins
 ** show who starts
 */
