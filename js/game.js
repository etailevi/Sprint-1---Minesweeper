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

// Model:
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
    randMinesIdx(board)
    findCloseMineNegsCount(board)
    console.log(board)
    return board
}

// DOM:
function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var className = ''
            strHTML += `<td
            class="${className}" onclick="onCellClicked(this, ${i}, ${j})"
            oncontextmenu="onCellMarked(this, ${i}, ${j}, event)">${EMPTY}</td>`
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector('.game-board')
    elBoard.innerHTML = strHTML
    

}

function onCellClicked(elCell, i, j) {

    var currCell = gBoard[i][j]
    if (currCell.isShown || currCell.isMarked) {
        return
    } else {
        if (!currCell.minesAroundCount) elCell.innerText = EMPTY
        else elCell.innerText = currCell.minesAroundCount
        elCell.classList.add('shown')
    }
    if (currCell.isMine) {
        elCell.style.backgroundColor = 'tomato'
        elCell.innerText = MINE
        checkGameOver()
    }
    // if{!gGame.is} return
    // if(currCell.isMarked || currCell.isShown)
}

function onCellMarked(elCell,i, j, ev) {
    ev.preventDefault()
    var currCell = gBoard[i][j]
    if (currCell.isShown) return // checks if he is already shown in the board
    elCell.classList.toggle('marked')

    if (currCell.isMarked) {
        currCell.isMarked = false
        elCell.innerHTML = ''
        if (currCell.isMine) gGame.markedCount--
    } else {
        currCell.isMarked = true
        elCell.innerHTML = FLAG
        if (currCell.isMine) gGame.markedCount++
    }
}

function checkGameOver() {
    console.log('game over')
}

function expandShown(board, elCell, i, j) {

}


