'use strict'

// cell contains:
const EMPTY = ''
const MINE = '💣'
const FLAG = '🚩'



// Model:
var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, lifeCount: 3 }
var gBoard




function onInit() { // This is called when the page loads
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
}

function buildBoard(boardSize) {

    const board = []
    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    // board[1][1].isMine = true
    // board[2][2].isMine = true
    getRandMinesIdx(board)
    findCloseMineNegsCount(board)
    console.log(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var className = ''
            strHTML += `<td
            class="${className}" onclick="onCellClicked(this, ${i}, ${j})"></td>`
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector('.game-board')
    elBoard.innerHTML = strHTML
    

}

function onCellClicked(elCell, i, j) {
    console.log('elCell', elCell)
    console.log('i', i)
    console.log('j', j)
    var currCell = gBoard[i][j]
    if (currCell.isShown || currCell.isMarked) {
        return
    } else {
        if (!currCell.minesAroundCount) elCell.innerText = EMPTY
        else elCell.innerText = currCell.minesAroundCount
        elCell.classList.add('shown')
    }
    if (currCell.isMine) {
        elCell.innerText = MINE
        checkGameOver()
    }
    // if{!gGame.is} return
    // if(currCell.isMarked || currCell.isShown)
}

function onCellMarked(elCell, ev) {

}

function checkGameOver() {
    console.log('game over')
}

function expandShown(board, elCell, i, j) {

}

function getRandMinesIdx(board) {

    var mineCount = 0
    while (mineCount < gLevel.MINES) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                // if (!board.isMine) {
                    if (getRandomIntInclusive(1, 10) < 2) {
                        board[i][j].isMine = true
                        mineCount++
                        console.log('hi')
                    }
                // }
            }
        }
    }
}
