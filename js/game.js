'use strict'


const EMPTY = ''
const MINE = '💣'
const FLAG = '🚩'



// Model:
var gBoard

var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }


function onInit() { // This is called when the page loads

    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
}

function buildBoard(boardSize) {

    const board = []

    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {
                minesAroundCount: setMinesNegsCount(board),
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
    board[1][1].isMine = true
    board[2][2].isMine = true
    console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var className = (currCell.isMine) ? 'mine' : ''
            strHTML += `<td
            class="${className}" onclick="cellClicked(this, ${i}, ${j})" >${currCell}</td>`
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.game-board')
    elBoard.innerHTML = strHTML


}

function onCellClicked(elCell, i, j) {

}

function onCellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}