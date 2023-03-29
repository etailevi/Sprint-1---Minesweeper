'use strict'


const EMPTY = ''
const MINE = '💣'
const FLAG = '🚩'



// Model:
var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
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
                isMarked: true
            }
            board[i][j] = cell
        }
    }
    board[1][1].isMine = true
    board[2][2].isMine = true
    findCloseMineNegsCount(board)
    console.log(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var className = ''
            if(currCell.isMine){
                var className = 'mine'
                currCell = MINE
            } else {
                currCell = currCell.minesAroundCount
            }
            strHTML += `<td
            class="${className}" onclick="cellClicked(this, ${i}, ${j})" >${currCell}</td>`
        }
        strHTML += `</tr>`
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