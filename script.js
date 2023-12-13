let playerBoardNumbers = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

let computerBoardNumbers = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

let isTheGameOver = false;

document.addEventListener("DOMContentLoaded", function () {
    const playerBoard = document.getElementById("playerBoard");
    const computerBoard = document.getElementById("computerBoard");

    createBoard(playerBoard, true, true);
    createBoard(computerBoard, false);

    generateShips(false);
    console.log(computerBoardNumbers)
    generateShips(true);
    console.log(playerBoardNumbers)

});

function createBoard(board, isPlayer, isNeedOpenAll) {
    board.innerHTML = "";
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        //choose color
        if (isPlayer) {
            switch (playerBoardNumbers[i]) {
                case 1:
                    cell.className = cell.className + " hit";
                    break;
                case -1:
                    cell.className = cell.className + " miss";
                    break;
                case 2:
                    cell.className = cell.className + " ship";
                    break;
                default:
                    break;
            }
        } else {
            switch (computerBoardNumbers[i]) {
                case 1:
                    cell.className = cell.className + " hit";
                    break;
                case -1:
                    cell.className = cell.className + " miss";
                    break;
                case 2:
                    if (isNeedOpenAll) cell.className = cell.className + " ship";
                    break;
                default:
                    break;
            }
        }

        cell.dataset.index = i;

        if (isPlayer) {
        } else {
            cell.addEventListener("click",  () => {
                console.log("test")
                playerTurn(i)
                if (playerTurn(i)) {
                    while (true && !isTheGameOver) {
                        if (computerTurn(Math.ceil(Math.random() * 100))) {
                            break;
                        }
                    }
                }
            });
        }

        board.appendChild(cell);
    }
}

const playerTurn = (number) => {
    let flag = true;
    if (computerBoardNumbers[number] === 2) {
        computerBoardNumbers[number] = 1;
        flag = false;
    } else if (computerBoardNumbers[number] === 0) {
        computerBoardNumbers[number] = -1;
        flag = true;
    }
    reloadBoards();
    isGameOver();
    return flag;
};

const computerTurn = (number) => {
    console.log(number)
    let flag = true;
    if (playerBoardNumbers[number] === 2) {
        playerBoardNumbers[number] = 1;
        flag = false;
    } else if (playerBoardNumbers[number] === 0) {
        playerBoardNumbers[number] = -1;
        flag = true;
    } else if(playerBoardNumbers[number] === -1 || playerBoardNumbers[number] === 1){
        flag = false;
    }
    reloadBoards();
    isGameOver();
    return flag;
};

const reloadBoards = () => {
    const playerBoard = document.getElementById("playerBoard");
    const computerBoard = document.getElementById("computerBoard");

    createBoard(playerBoard, true, true);
    createBoard(computerBoard, false);
};

const isGameOver = () => {
    if (reviewBoart(playerBoardNumbers)) {
        window.alert("Computer win")
        console.log("Computer win");
        isTheGameOver = true;
        openAllShips();
    }
    if (reviewBoart(computerBoardNumbers)) {
        window.alert("Player win")
        console.log("Player win");
    }
};

const reviewBoart = (board) => {
    let is2Presents = false;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 2) {
            is2Presents = true;
            break;
        }
    }
    return !is2Presents;
};

const openAllShips = () => {
    const playerBoard = document.getElementById("playerBoard");
    const computerBoard = document.getElementById("computerBoard");

    createBoard(playerBoard, true, true);
    createBoard(computerBoard, false, true);
};

const generateShips = (isPeople) => {
    console.log("generate");

    while (true) {
        let arr = [];
        if (isPeople) {
            arr.push(generate4Ship(playerBoardNumbers, true));
            arr.push(generate3Ship(playerBoardNumbers, true));
            arr.push(generate3Ship(playerBoardNumbers, true));
            arr.push(generate2Ship(playerBoardNumbers, true));
            arr.push(generate2Ship(playerBoardNumbers, true));
            arr.push(generate2Ship(playerBoardNumbers, true));
            arr.push(generate1Ship(playerBoardNumbers, true));
            arr.push(generate1Ship(playerBoardNumbers, true));
            arr.push(generate1Ship(playerBoardNumbers, true));
            arr.push(generate1Ship(playerBoardNumbers, true));
        } else {
            arr.push(generate4Ship(computerBoardNumbers, false));
            arr.push(generate3Ship(computerBoardNumbers, false));
            arr.push(generate3Ship(computerBoardNumbers, false));
            arr.push(generate2Ship(computerBoardNumbers, false));
            arr.push(generate2Ship(computerBoardNumbers, false));
            arr.push(generate2Ship(computerBoardNumbers, false));
            arr.push(generate1Ship(computerBoardNumbers, false));
            arr.push(generate1Ship(computerBoardNumbers, false));
            arr.push(generate1Ship(computerBoardNumbers, false));
            arr.push(generate1Ship(computerBoardNumbers, false));
        }


        console.log(arr);

        if (arr.filter((elem) => elem !== true).length === 0) {
            break;
        } else {
            if (isPeople) {
                playerBoardNumbers = [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ];
            } else {
                computerBoardNumbers = [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0,
                ];
            }


        }
    }

    reloadBoards();
};

const generate4Ship = (board, isPlayer) => {
    let location = 0;
    let direction = true;
    let isGenerationCorrect = true;

    location = Math.ceil(Math.random() * board.length);
    direction = Math.ceil(Math.random() * board.length) % 2 === 0;
    const buffBoard = [...board];

    if (location % 10 < 2 || location % 10 > 6) {
        if (location > 60) {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location - 10] == 0 &&
                    buffBoard[location - 20] == 0 &&
                    buffBoard[location - 30] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location - 10] = 2;
            buffBoard[location - 20] = 2;
            buffBoard[location - 30] = 2;
        } else {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 10] == 0 &&
                    buffBoard[location + 20] == 0 &&
                    buffBoard[location + 30] == 0
                )
            ) {
                isGenerationCorrect = false;
            }

            buffBoard[location] = 2;
            buffBoard[location + 10] = 2;
            buffBoard[location + 20] = 2;
            buffBoard[location + 30] = 2;
        }
    } else if (location < 30 || location > 60) {
        if (location % 10 > 6) {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location - 1] == 0 &&
                    buffBoard[location - 2] == 0 &&
                    buffBoard[location - 3] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location - 1] = 2;
            buffBoard[location - 2] = 2;
            buffBoard[location - 3] = 2;
        } else {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 1] == 0 &&
                    buffBoard[location + 2] == 0 &&
                    buffBoard[location + 3] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 1] = 2;
            buffBoard[location + 2] = 2;
            buffBoard[location + 3] = 2;
        }
    } else {
        if (direction) {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 10] == 0 &&
                    buffBoard[location + 20] == 0 &&
                    buffBoard[location + 30] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 10] = 2;
            buffBoard[location + 20] = 2;
            buffBoard[location + 30] = 2;
        } else {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 1] == 0 &&
                    buffBoard[location + 2] == 0 &&
                    buffBoard[location + 3] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 1] = 2;
            buffBoard[location + 2] = 2;
            buffBoard[location + 3] = 2;
        }
    }
    if (isGenerationCorrect) {
        if (isPlayer) {
            playerBoardNumbers = [...buffBoard];
        } else {
            computerBoardNumbers = [...buffBoard];
        }
    }
    return isGenerationCorrect;
};

const generate3Ship = (board, isPlayer) => {
    let location = 0;
    let direction = true;
    let isGenerationCorrect = true;

    location = Math.ceil(Math.random() * board.length);
    direction = Math.ceil(Math.random() * board.length) % 2 === 0;
    const buffBoard = [...board];

    if (location % 10 < 2 || location % 10 > 7) {
        if (location > 70) {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location - 10] == 0 &&
                    buffBoard[location - 20] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location - 10] = 2;
            buffBoard[location - 20] = 2;
        } else {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 10] == 0 &&
                    buffBoard[location + 20] == 0
                )
            ) {
                isGenerationCorrect = false;
            }

            buffBoard[location] = 2;
            buffBoard[location + 10] = 2;
            buffBoard[location + 20] = 2;
        }
    } else if (location < 20 || location > 70) {
        if (location % 10 > 7) {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location - 1] == 0 &&
                    buffBoard[location - 2] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location - 1] = 2;
            buffBoard[location - 2] = 2;
        } else {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 1] == 0 &&
                    buffBoard[location + 2] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 1] = 2;
            buffBoard[location + 2] = 2;
        }
    } else {
        if (direction) {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 10] == 0 &&
                    buffBoard[location + 20] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 10] = 2;
            buffBoard[location + 20] = 2;
        } else {
            if (
                !(
                    buffBoard[location] == 0 &&
                    buffBoard[location + 1] == 0 &&
                    buffBoard[location + 2] == 0
                )
            ) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 1] = 2;
            buffBoard[location + 2] = 2;
        }
    }
    if (isGenerationCorrect) {
        if (isPlayer) {
            playerBoardNumbers = [...buffBoard];
        } else {
            computerBoardNumbers = [...buffBoard];
        }
    }
    return isGenerationCorrect;
};

const generate2Ship = (board, isPlayer) => {
    let location = 0;
    let direction = true;
    let isGenerationCorrect = true;

    location = Math.ceil(Math.random() * board.length);
    direction = Math.ceil(Math.random() * board.length) % 2 === 0;
    const buffBoard = [...board];

    if (location % 10 < 1 || location % 10 > 8) {
        if (location > 80) {
            if (!(buffBoard[location] == 0 && buffBoard[location - 10] == 0)) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location - 10] = 2;
        } else {
            if (!(buffBoard[location] == 0 && buffBoard[location + 10] == 0)) {
                isGenerationCorrect = false;
            }

            buffBoard[location] = 2;
            buffBoard[location + 10] = 2;
        }
    } else if (location < 10 || location > 80) {
        if (location % 10 > 8) {
            if (!(buffBoard[location] == 0 && buffBoard[location - 1] == 0)) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location - 1] = 2;
        } else {
            if (!(buffBoard[location] == 0 && buffBoard[location + 1] == 0)) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 1] = 2;
        }
    } else {
        if (direction) {
            if (!(buffBoard[location] == 0 && buffBoard[location + 10] == 0)) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 10] = 2;
        } else {
            if (!(buffBoard[location] == 0 && buffBoard[location + 1] == 0)) {
                isGenerationCorrect = false;
            }
            buffBoard[location] = 2;
            buffBoard[location + 1] = 2;
        }
    }
    if (isGenerationCorrect) {
        if (isPlayer) {
            playerBoardNumbers = [...buffBoard];
        } else {
            computerBoardNumbers = [...buffBoard];
        }
    }
    return isGenerationCorrect;
};

const generate1Ship = (board, isPlayer) => {
    let location = 0;
    let isGenerationCorrect = true;

    location = Math.ceil(Math.random() * board.length);
    direction = Math.ceil(Math.random() * board.length) % 2 === 0;
    const buffBoard = [...board];

    if (buffBoard[location] !== 2) {
        buffBoard[location] = 2;
        if (isPlayer) {
            playerBoardNumbers = [...buffBoard];
        } else {
            computerBoardNumbers = [...buffBoard];
        }
        return isGenerationCorrect;
    } else {
        return !isGenerationCorrect;
    }
};
