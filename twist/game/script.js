// ----------------------
// Step 1: Book Search
// ----------------------
const correctBook = "book2"; // Define which book is correct
const bookElements = document.querySelectorAll('.book');
const bookMessage = document.getElementById('book-message');

bookElements.forEach(book => {
  book.addEventListener('click', () => {
    const selectedBook = book.getAttribute('data-book');
    if (selectedBook === correctBook) {
      bookMessage.textContent = "You found the right book!";
      // Transition to the letter puzzle step after a brief pause
      setTimeout(() => {
        document.getElementById('book-search').style.display = "none";
        document.getElementById('letter-puzzle').style.display = "block";
        initLetterPuzzle();
      }, 1000);
    } else {
      bookMessage.textContent = "This book holds no secrets. Try another.";
    }
  });
});

// -------------------------
// Step 2: Letter Puzzle
// -------------------------
const targetPassword = "exonerate"; // Target word (9 letters)
let currentCombination = "";
const letterInput = document.getElementById('letterInput');
const letterMessage = document.getElementById('letter-message');

function initLetterPuzzle() {
  // The text extracted from the book; for this demo, we include the target word.
  const text = "The password lies in these letters: exonerate";
  const bookTextElement = document.getElementById('book-text');
  bookTextElement.innerHTML = "";
  
  // Split the text into individual characters and create clickable spans for letters
  for (let char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    if (/[a-zA-Z]/.test(char)) {
      span.classList.add('letter');
      span.addEventListener('click', () => {
        // Append the letter (in lowercase) to the combination
        currentCombination += char.toLowerCase();
        letterInput.value = currentCombination;
        checkCombination();
      });
    }
    bookTextElement.appendChild(span);
  }
}

function checkCombination() {
  // When the combination length reaches the target, evaluate it
  if (currentCombination.length === targetPassword.length) {
    if (currentCombination === targetPassword) {
      letterMessage.textContent = "Success! The safe is unlocked and the evidence is destroyed.";
      disableLetterClicks();
    } else {
      letterMessage.textContent = "Incorrect combination. Try again.";
    }
  }
}

function disableLetterClicks() {
  // Disable further clicking on the letter spans
  const letterSpans = document.querySelectorAll('.letter');
  letterSpans.forEach(span => {
    span.style.pointerEvents = "none";
  });
}

function resetCombination() {
  // Reset the current combination and clear the input field/message
  currentCombination = "";
  letterInput.value = "";
  letterMessage.textContent = "";
}
