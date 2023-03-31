'use strict'

function findCloseMineNegsCount(board) { // Update how many mines placed around a cell, based on a Neighbors-Loop
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                var currCell = board[i][j]
                currCell.minesAroundCount = setMinesNegsCount(board, i, j)
            }
        }
    }
    return board
}

function setMinesNegsCount(board, rowIdx, colIdx) { // Neighbors-Loop. Return the amount of neighbors of a cell which sent from another func.
    var minesAroundCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = board[i][j]
            if (currCell.isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}

function setMinesOnBoard(board, boardSize, numOfMines, firstClickPos) {
    var minePoss = []
    while (minePoss.length < numOfMines) {
        var currPos = {}
        currPos.i = getRandomInt(0, boardSize)
        currPos.j = getRandomInt(0, boardSize)
        if (!minePoss.includes(currPos.i && currPos.j) &&
        currPos.i !== firstClickPos.i && currPos.j  !== firstClickPos.j) {
            minePoss.push(currPos)
        }
    }

    for (var i = 0; i < numOfMines; i++) {
        var location = minePoss[i]
        board[location.i][location.j].isMine = true
    }
}

