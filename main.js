document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#gameBoard').addEventListener('click', event => {
        const pickedChip = event.target;
        const houseChip = event.currentTarget.querySelector('.chip-house');

        // classes
        pickedChip.classList.add('picked');
        pickedChip.style.zIndex = '10';
        pickedChip.setAttribute('disabled', 'true');
        houseChip.setAttribute('disabled', 'true');
        event.currentTarget.classList.add('game-start');
        document.querySelector('#gameResult').classList.add('show-result');

        gameStart(pickedChip, houseChip);
    });

    // play again
    document.querySelector('#btnPlayAgain').addEventListener('click', () => {
        document.querySelector('#gameResult').classList.remove('show-result');
        document.querySelector('#gameBoard').classList.remove('game-start');

        setTimeout(() => {
            document.querySelector('#chipHouse').removeAttribute('value');
            document.querySelector('#chipHouse').className = 'chip chip-house';
        }, 1000);
        
        document.querySelectorAll('button.chip').forEach(chip => {
            chip.classList.remove('won');
            chip.classList.remove('picked');
            chip.removeAttribute('disabled');
            setTimeout(() => chip.removeAttribute('style'), 3000);
        });
    });
});


function gameStart(picked, house) {
    const hVal = housePick(house);
    const pVal = picked.getAttribute('value');
    const score = document.querySelector('#score');
    let result = '';

    if (pVal == hVal) {
        result = 'DRAW';
    } else {
        switch (pVal) {
            case 'rock':
                result = ['scissors', 'lizard'].indexOf(hVal) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'paper':
                result = ['rock', 'spock'].indexOf(hVal) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'scissors':
                result = ['paper', 'lizard'].indexOf(hVal) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'lizard':
                result = ['paper', 'spock'].indexOf(hVal) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'spock':
                result = ['scissors', 'rock'].indexOf(hVal) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
        };
    }

    document.querySelector('#result').innerHTML = result;
    if (result == 'YOU WIN') {
        picked.classList.add('won');
        setTimeout(() => score.innerHTML = parseInt(score.innerHTML) + 1, 2500);
        
    } else if (result == 'YOU LOSE') {
        house.classList.add('won');
        setTimeout(() => score.innerHTML = parseInt(score.innerHTML) - 1, 2500);
    }

    
}

function housePick(house) {
    const rngPick = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
    house.classList.add(`chip-${rngPick}`);
    house.setAttribute('value', rngPick);
    house.querySelector('img').setAttribute('src', `./images/icon-${rngPick}.svg`)
    return rngPick;
}