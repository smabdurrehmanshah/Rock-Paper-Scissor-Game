let score = JSON.parse(localStorage.getItem('score')) || {
  Wins : 0 ,
  Losses : 0 , 
  Tie : 0
}

updateScoreElement();

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });

document.querySelector('.js-scissor-button')
  .addEventListener('click', () => {
    playGame('Scissor');
  });

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r')
    playGame('Rock');
  else if(event.key === 'p')
    playGame('Paper');
  else if(event.key === 's')
    playGame('Scissor');
  else if(event.key === 'a')
    autoPlay();
  else if(event.key === 'Backspace')
    showResetConfirmation();
});

function playGame(playerMove)
{
  const computerMove = pickComputerMove() ;
  let result = '';
  
  if(playerMove === 'Rock')
  {
    if(computerMove === 'Rock')
    {
      result = 'Tie';
      score.Tie += 1 ;
    }
    else if(computerMove === 'Paper')
    {
      result = 'You lose';
      score.Losses += 1 ;
    }
    else if(computerMove === 'Scissor')
    {
      result = 'You win';
      score.Wins += 1 ;
    }
  }

  else if(playerMove === 'Paper')
  {
    if(computerMove === 'Rock')
    {
      result = 'You win';
      score.Wins += 1 ;
    }
    else if(computerMove === 'Paper')
    {
      result = 'Tie';
      score.Tie += 1 ;
    }
    else if(computerMove === 'Scissor')
    {
      result = 'You lose';
      score.Losses += 1 ;
    }
  }

  else if(playerMove === 'Scissor')
  {
    if(computerMove === 'Rock')
    {
      result = 'You lose';
      score.Losses += 1 ;
    }
    else if(computerMove === 'Paper')
    {
      result = 'You win';
      score.Wins += 1 ;
    }
    else if(computerMove === 'Scissor')
    {
      result = 'Tie';
      score.Tie += 1 ;
    }
  }
  
  localStorage.setItem('score' , JSON.stringify(score));
  
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = result ;

  document.querySelector('.js-move')
    .innerHTML = `You picked <img src="Images/${playerMove}-emoji.png">
    <img src="Images/${computerMove}-emoji.png"> Computer picked `;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Tie: ${score.Tie}` ;
}

function pickComputerMove() 
{
  const randomMove = Math.random() ;
  let computerMove = "" ;

  if (randomMove >= 0 && randomMove < 1/3)
  {
    computerMove = 'Rock' ;
  }
  else if (randomMove >= 1/3 && randomMove < 2/3)
  {
    computerMove = 'Paper' ;
  }
  else if (randomMove >= 2/3 && randomMove < 1)
  {
    computerMove = 'Scissor' ;
  }

  return computerMove ;
}

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    showResetConfirmation();
  });

const autoPlayButton = document.querySelector('.js-auto-play-button');
autoPlayButton.addEventListener('click', () => {
   autoPlay();
  });

  function autoPlay() {
    if(autoPlayButton.innerText === 'Auto Play') {
      intervalId = setInterval(() => {
        playGame(pickComputerMove());
        autoPlayButton.innerHTML = 'Stop Playing';
      }, 1000);
    }
    else {
      clearInterval(intervalId);
      autoPlayButton.innerHTML = 'Auto Play';
    }
  }

  function resetScore() {
    score.Wins = 0 ;
    score.Losses = 0 ;
    score.Tie = 0 ;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = `
        Are you sure you want to reset the score?
        <button class= "js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class= "js-reset-confirm-no reset-confirm-button">
          No
        </button>
      `;

    document.querySelector('.js-reset-confirm-yes')
      .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
      });

    document.querySelector('.js-reset-confirm-no')
      .addEventListener('click', () => {
        hideResetConfirmation();
      });
  }

  function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = '';
  }