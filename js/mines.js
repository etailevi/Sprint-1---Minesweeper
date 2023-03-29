'use strict'

function setMinesNegsCount(board) {
    var minesAroundCount = 0

    for (var i = board[i] - 1; i <= board[i] + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = board[j] - 1; j <= board[j] + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === board[i] && j === board[j]) continue
            if (board[i][j].isMine) negsCount++
        }
    }
    console.log('minesAroundCount', minesAroundCount)
    return minesAroundCount
}