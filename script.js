// script.js - doing all the JavaScript outside the HTML like required

// Getting the GIF element to move it
const memeImg = document.getElementById('memeImage');

// Getting the buttons to enable/disable them
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// Message box for innerHTML updates (no alerts allowed)
const messageBox = document.getElementById('messageBox');

// This stores the interval ID (null = not moving)
let moveIntervalId = null;

// How often the GIF moves (milliseconds)
const MOVE_INTERVAL_MS = 500;

/* Finds the max X and Y space so GIF stays on screen */
function calculateMaxPositions() {
    const maxX = window.innerWidth - memeImg.clientWidth;
    const maxY = window.innerHeight - memeImg.clientHeight;
    return { maxX, maxY };
}

/* Moves the GIF to a random location */
function moveImageOnce() {
    const { maxX, maxY } = calculateMaxPositions();
    memeImg.style.left = Math.random() * maxX + "px";
    memeImg.style.top = Math.random() * maxY + "px";
}

/* Actually starts the movement loop */
function startMoving() {
    if (moveIntervalId !== null) {
        messageBox.innerHTML = "It's already moving lol.";
        return;
    }

    moveImageOnce();
    moveIntervalId = setInterval(moveImageOnce, MOVE_INTERVAL_MS);

    messageBox.innerHTML = "GIF is moving now!";
}

/* Actually stops the movement loop */
function stopMoving() {
    if (moveIntervalId === null) {
        messageBox.innerHTML = "It’s already stopped!";
        return;
    }

    clearInterval(moveIntervalId);
    moveIntervalId = null;

    messageBox.innerHTML = "GIF movement stopped.";
}

/* Disables Start, enables Stop, and begins movement */
function disableStartButton() {
    startBtn.disabled = true;
    startMoving();
}

/* Enables Start button */
function enableStartButton() {
    startBtn.disabled = false;
}

/* Disables Stop, enables Start, and stops movement */
function disableStopButton() {
    stopBtn.disabled = true;
    stopMoving();
}

/* Enables Stop button */
function enableStopButton() {
    stopBtn.disabled = false;
}

/* For Start button click */
function handleStartClick() {
    disableStartButton();
    enableStopButton();
}

/* For Stop button click */
function handleStopClick() {
    disableStopButton();
    enableStartButton();
}

/* Set initial UI states when page loads */
(function initUI() {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    memeImg.style.left = "30px";
    memeImg.style.top = "140px";

    messageBox.innerHTML = "Click Start to move the GIF!";
})();
