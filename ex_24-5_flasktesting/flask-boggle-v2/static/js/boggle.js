class BoggleGame {
  constructor(timerDuration = 60) {
    this.timerDuration = timerDuration;
    this.words = new Set();
    this.score = 0;
    this.playing = True;
    // create form and append to webpage
    // add a submit handler on form
  }

  handleSubmit() {
    // check form for submitted value
    // if invalid input, handle with message
    // if valid input, run checkWOrd method
  }

  checkWord() {
    // if valid input, talk to flask API to check word
    // if valid word, update list, calculate and update score
  }

  toggleMessage(message, display = true) {}

  updateTimer() {
    // update displayed time on webpage
    // end game if timer is expired
  }

  endGame() {
    // disable event handlers if timer is
  }

  updateGameStats() {
    currentScore = this.score;
    // check high score via flask
  }

  // CONSTUCTOR
  // properties: boardContainer, score (0), words (empty set), timerDuration
  // set boardcontainer
  // set score: initialize to 0
  // set word list: initialize to empty
  // METHODS
  // method: show word
  // append valid word to displayed word list
  // method: show message
  // steps: if timer expires, display message about high score and refresh to play again
  // method: handle submit
  // steps: check if valid, adjust format as needed, check if in word list already, Flask API to check submitted word, if valid word display word and update score
  // tick timer
  // method: score game
  // steps: get current game score, Flask API to check high score, update UI accordingly
  // update stats
}
