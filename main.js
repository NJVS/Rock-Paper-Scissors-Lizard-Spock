document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#gameBoard').addEventListener('click', event => {
        const pickedChip = event.target.closest('button.chip');
        const houseChip = event.currentTarget.querySelector('.chip-house');

        if (!pickedChip) return;

        gameStart(pickedChip, houseChip);
        // picked chip
        pickedChip.classList.add('picked');
        pickedChip.style.zIndex = '10';
        // board close
        event.currentTarget.classList.add('game-start');
        
        // // house pick
        // housePick(houseChip);

        // hide other buttons
        event.currentTarget.querySelectorAll('.chip').forEach(btn => {
            if (!btn.classList.contains('picked') && !btn.classList.contains('chip-house')) {
                btn.classList.add('unpicked');
            }
        });


        // check result
        setTimeout(() => {
            pickedChip.setAttribute('disabled', 'true');
            pickedChip.classList.add('result');
            houseChip.classList.add('result');

            setTimeout(() => {
                houseChip.classList.add('won');
                document.querySelector('#gameResult').classList.add('show-result');
            }, 500);
        }, 2000);
    });

    // play again
    document.querySelector('#btnPlayAgain').addEventListener('click', event => {
        document.querySelector('#gameResult').classList.remove('show-result');
        document.querySelector('#gameBoard').classList.remove('game-start');
        
        document.querySelectorAll('button.chip').forEach(chip => {
            chip.classList.remove('won');
            chip.classList.remove('result');
            chip.classList.remove('picked');
            chip.removeAttribute('disabled');
            if (chip.classList.contains('unpicked')) {
                setTimeout(() => {
                    chip.classList.remove('unpicked');
                    document.querySelector('#chipHouse').className = 'chip chip-house';
                    document.querySelector('#chipHouse').removeAttribute('value');
                }, 2500);
            }
            setTimeout(() => {
                chip.removeAttribute('style');
            }, 3000);
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

    setTimeout(() => {
        if (result == 'YOU WIN') {
            score.innerHTML = parseInt(score.innerHTML) + 1;
        } else if (result == 'YOU LOSE') {
            score.innerHTML = parseInt(score.innerHTML) - 1;
        }
    }, 2500);
}

function housePick(house) {
    const rngPick = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
    house.classList.add(`chip-${rngPick}`);
    house.setAttribute('value', rngPick);
    house.querySelector('img').setAttribute('src', `./images/icon-${rngPick}.svg`)
    return rngPick;
}