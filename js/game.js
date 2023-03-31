'use strict'

// cell contains:
const EMPTY = ''
const MINE = '💣'
const FLAG = '🚩'



// Model:
var gLevel = { SIZE: 4, MINES: 2 }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lifeCount: 3,
    isFirstClick: true,
    isVictory: false
}
var gBoard
var gInterval




function onInit() { // This is called when the page loads
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lifeCount: 3,
        isFirstClick: true,
        isVictory: false
    }
    renderBoard()
    closeModal()
}

// Model:
function buildBoard(boardSize, numOfMines, firstClickPos) {
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
    // board[1][1].isMine = true // Delete when the game is done
    // board[2][2].isMine = true // Delete when the game is done
    setMinesOnBoard(board, boardSize, numOfMines, firstClickPos) // Turn on when finish the game
    findCloseMineNegsCount(board)
    console.log(board)
    return board
}

// DOM:
function renderBoard() {
    var strHTML = ''

    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gLevel.SIZE; j++) {
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
    if (gGame.isFirstClick) {
        gGame.isFirstClick = false
        gBoard = buildBoard(gLevel.SIZE, gLevel.MINES, { i, j })
    }
    var currCell = gBoard[i][j]
    if (currCell.isShown || currCell.isMarked) {
        return
    } else {
        if (!currCell.minesAroundCount) elCell.innerText = EMPTY
        else elCell.innerText = currCell.minesAroundCount
        gGame.shownCount++
        console.log('gGame.shownCount', gGame.shownCount)
        elCell.classList.add('shown')
    }
    if (currCell.isMine) {
        elCell.style.backgroundColor = 'tomato'
        gGame.shownCount++
        elCell.innerText = MINE
        checkGameOver()
    }
    // if{!gGame.is} return
    // if(currCell.isMarked || currCell.isShown)
}

function onCellMarked(elCell, i, j, ev) {
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
    if (gGame.lifeCount > 0) {
        gGame.lifeCount--
        const elSmileyBtn = document.querySelector('.start-btn')
        if (gGame.lifeCount === 2) elSmileyBtn.innerText = '🤨'
        if (gGame.lifeCount === 1) elSmileyBtn.innerText = '😥'
        if (gGame.lifeCount === 0) {
            elSmileyBtn.innerText = '😵'
            var msg = gGame.isVictory ? 'You Won!!!' : 'Game Over'
            openModal(msg)
        }

        console.log('gGame.lifeCount', gGame.lifeCount)
        return
    } else if (gLevel.SIZE ** 2 === gGame.shownCount + gGame.markedCount &&
        gGame.markedCount === gLevel.MINES) {
        gGame.isVictory = true
        openModal(msg)
    } else {
        gGame.isOn = false
        clearInterval(gInterval)
        openModal(msg)
    }
}

function gameOver() {

}

function startOver(elBtn) {
    onInit()
}

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elSpan = document.querySelector('.msg')
    elSpan.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    const elSmileyBtn = document.querySelector('.start-btn')
    elSmileyBtn.innerText = '😊'
}

function expandShown(board, elCell, i, j) {

}

function selectMode(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    onInit()
}

