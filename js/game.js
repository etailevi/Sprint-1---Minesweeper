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
var gTimerInterval




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
    document.querySelector('#timer').innerText = '00:00'
    clearInterval(gTimerInterval)
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
            class="${className}" 
            data-i="${i}" data-j="${j}"
            onclick="onCellClicked(this, ${i}, ${j})"
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
        startTimer()
    }
    var currCell = gBoard[i][j]
    if (currCell.isShown || currCell.isMarked) {
        return
    } else {
        if (!currCell.minesAroundCount) {
            elCell.classList.add('shown')
            gGame.shownCount++
            console.log('gGame.shownCount', gGame.shownCount)
            elCell.innerText = EMPTY
            expandShown(gBoard, elCell, i, j)
        } else if (!elCell.classList.contains('shown') &&
                    gBoard[i][j].isMine === false) {
            elCell.innerText = currCell.minesAroundCount
            elCell.classList.add('shown')
            gGame.shownCount++
        }

        // if (!elCell.classList.contains('shown')) {
            
        // }
    }
    if (currCell.isMine) {
        elCell.style.backgroundColor = 'tomato'
        elCell.classList.add('mine')
        elCell.innerText = MINE
        checkGameOver()
    }
    // expandShown(gBoard, elCell, i, j)
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
        gGame.markedCount--
        console.log('gGame.markedCount', gGame.markedCount)
    } else {
        currCell.isMarked = true
        elCell.innerHTML = FLAG
        gGame.markedCount++
        console.log('gGame.markedCount', gGame.markedCount)
    }
}

function expandShown(board, elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === cellI && j === cellJ) continue
            if (!board[i][j].minesAroundCount && !board[i][j].isMine && !board[i][j].isMarked) {
                board[i][j].isShown = true
                elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.classList.add('shown')
                gGame.shownCount++
                console.log('gGame.shownCount', gGame.shownCount)
            }
        }
    }
}

function checkGameOver() {
    if (gGame.lifeCount > 0) {
        gGame.lifeCount--
        const elSmileyBtn = document.querySelector('.start-btn')
        const elHearts = document.querySelector('.hearts span')
        if (gGame.lifeCount === 2) {
            elSmileyBtn.innerText = '🤨'
            elHearts.innerText = '❤️❤️🤍'
        }
        if (gGame.lifeCount === 1) {
            elSmileyBtn.innerText = '😥'
            elHearts.innerText = '❤️🤍🤍'
        }
        if (gGame.lifeCount === 0) {
            elSmileyBtn.innerText = '😵'
            elHearts.innerText = '💔🤍🤍'
            openModal('You Lose!')
        }
        // return
    } else if (gLevel.SIZE ** 2 === gGame.shownCount + gGame.markedCount &&
        gGame.markedCount === gLevel.MINES) {
        // gGame.isVictory = true
        // var msg = gGame.isVictory ? 'You Won!!!' : 'Game Over'
        openModal('You Win!!!')
    }
}

function gameOver() {
    clearInterval(gTimerInterval)
}

function startOver(elBtn) {
    onInit()
}

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elSpan = document.querySelector('.msg')
    elSpan.innerText = msg
    elModal.style.display = 'block'
    gameOver()
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    const elSmileyBtn = document.querySelector('.start-btn')
    elSmileyBtn.innerText = '😊'
    const elHearts = document.querySelector('.hearts span')
    elHearts.innerText = '❤️❤️❤️'
    clearInterval(gTimerInterval)
}

function startTimer() {
    var startTime = Date.now()
    gTimerInterval = setInterval(setTimer, 37, startTime)
}

function selectMode(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    onInit()
}

