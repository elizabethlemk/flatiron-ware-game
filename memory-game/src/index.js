document.addEventListener('DOMContentLoaded', ()=>{
//-----------------------//
// important variables
//-----------------------//
  const cards = document.querySelectorAll('.memory-card')
  const scoreBoard = document.querySelector('.score')

  let hasFlippedCard = false
  let firstCard, secondCard
  let lockBoard = false //lock board to prevent flipping more than two cards at a time
  let score = 0

//-----------------------//
// event listener
//-----------------------//
  cards.forEach(card => card.addEventListener('click', flipCard))

//-----------------------//
// helper functions
//-----------------------//
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip')
    if (!hasFlippedCard) {
      hasFlippedCard = true
      firstCard = this
      return;
       }
     secondCard = this
     checkForMatch()
     }

// if cards are matched, then disable them
  function checkForMatch() {
   if (firstCard.dataset.framework === secondCard.dataset.framework) {
     disableCards()
     return;
   }
   unflipCards()
  }

// removed event listener from matched cards
  function disableCards() {
   firstCard.removeEventListener('click', flipCard)
   secondCard.removeEventListener('click', flipCard)
   score += 2
   scoreBoard.innerText = score
   resetBoard();
  }

// unflips cards when wrongly matched
  function unflipCards() {
    lockBoard = true
   setTimeout(() => {
     firstCard.classList.remove('flip')
     secondCard.classList.remove('flip')
     resetBoard();
   }, 1000)
  }

// resets firstCard and secondCard variables after each round
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
    if (score === 12) { //resets board if you win the game
      setTimeout(() => {
        cards.forEach(card => {card.addEventListener('click', flipCard)
          card.classList.remove('flip')
        })
        score = 0
        scoreBoard.innerText = score
        shuffle()
      }, 1000)
    }
  }

// shuffles the cards at the beginning of a game
  function shuffle() {
    cards.forEach(card => {
      let randPos = Math.floor(Math.random() * 12)
      card.style.order = randPos
    })
  }
  shuffle()
})
