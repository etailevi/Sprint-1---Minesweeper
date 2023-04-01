'use strict'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is inclusive
}

function setTimer(startTime) {
  var elapsedTime = Date.now() - startTime
  var elTimer = document.querySelector('.timer span')
  elTimer.innerText = (elapsedTime / 1000).toFixed(3)
}