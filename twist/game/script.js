// The safe's password is "exonerate" (9 letters)
const answer = "exonerate";
const maxGuesses = 6;
let guessCount = 0;

const grid = document.getElementById('grid');
const guessInput = document.getElementById('guessInput');
const messageDiv = document.getElementById('message');

// Create the empty grid for guesses
function initGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < maxGuesses; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < answer.length; j++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.setAttribute('id', 'tile-' + i + '-' + j);
      const span = document.createElement('span');
      span.textContent = '';
      tile.appendChild(span);
      row.appendChild(tile);
    }
    grid.appendChild(row);
  }
}

// Compare the guess to the answer and return color-coded statuses
function evaluateGuess(guess) {
  const answerArr = answer.split('');
  const guessArr = guess.split('');
  const result = Array(answer.length).fill('absent');

  // First pass: mark correct letters
  for (let i = 0; i < answer.length; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = 'correct';
      answerArr[i] = null; // Avoid duplicate matching
    }
  }
  
  // Second pass: mark letters that are present but misplaced
  for (let i = 0; i < answer.length; i++) {
    if (result[i] !== 'correct' && answerArr.includes(guessArr[i])) {
      result[i] = 'present';
      answerArr[answerArr.indexOf(guessArr[i])] = null;
    }
  }
  return result;
}

// Process the player's guess
function submitGuess() {
  const guess = guessInput.value.toLowerCase();
  if (guess.length !== answer.length) {
    messageDiv.textContent = "Enter a " + answer.length + "-letter word.";
    return;
  }
  if (guessCount >= maxGuesses) return;

  const evaluation = evaluateGuess(guess);
  for (let i = 0; i < answer.length; i++) {
    const tile = document.getElementById('tile-' + guessCount + '-' + i);
    tile.querySelector('span').textContent = guess[i];
    tile.classList.add(evaluation[i]);
  }
  guessCount++;
  guessInput.value = "";
  messageDiv.textContent = "";
  
  if (guess === answer) {
    messageDiv.textContent = "Success! The safe is unlocked. Destroy the evidence and bury your past.";
    guessInput.disabled = true;
  } else if (guessCount === maxGuesses) {
    messageDiv.textContent = "Game over! The safe remains locked. The evidence of your crimes endures.";
    guessInput.disabled = true;
  }
}

initGrid();
