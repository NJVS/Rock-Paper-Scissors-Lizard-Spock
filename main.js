// USING KEYFRAME
document.addEventListener('DOMContentLoaded', () => {

    //rules
    document.querySelector('#showRules').addEventListener('click', () => {
        document.querySelector('.rules').classList.add('show');
    });
    document.querySelector('#closeRules').addEventListener('click', () => {
        document.querySelector('.rules').classList.remove('show');
    });

    // local storage score
    document.querySelector('#score').innerHTML = getScore();

    // game
    document.querySelector('#board').addEventListener('click', event => {
        const picked = event.target;
        const board = event.currentTarget;
        if (!picked.classList.contains('chip')) return;
        
        // clasess
        board.classList.add('game-start');  // board
        picked.classList.add('picked');     // chip

        // start
        start(picked.value);

        // game end
        setTimeout(() => board.classList.add('game-end'), 3000);
    });

    // play again
    document.querySelector('#btnPlayAgain').addEventListener('click', () => {
        document.querySelector('#board').classList.add('game-restart');
        document.querySelector('#board').classList.remove('game-start', 'game-end');

        setTimeout(() => {
            document.querySelector('#board').classList.remove('game-restart');
            document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('picked', 'won'));
            document.querySelector('#btnHouse').className = 'chip chip-house';
        }, 2000);
    });
});


function start(pickedVal) {
    const houseVal = housePick();
    const resultTxt = document.querySelector('#result'); 

    if (pickedVal == houseVal) {
        resultTxt.innerHTML = 'DRAW';
    } else {
        let result;

        switch (pickedVal) {
            case 'rock':
                result = ['scissors', 'lizard'].indexOf(houseVal) == -1 ? false : true;
                break;
            case 'paper':
                result = ['rock', 'spock'].indexOf(houseVal) == -1 ? false : true;
                break;
            case 'scissors':
                result = ['paper', 'lizard'].indexOf(houseVal) == -1 ? false : true;
                break;
            case 'lizard':
                result = ['paper', 'spock'].indexOf(houseVal) == -1 ? false : true;
                break;
            case 'spock':
                result = ['scissors', 'rock'].indexOf(houseVal) == -1 ? false : true;
                break;
        };

        resultTxt.innerHTML = result ? 'YOU WIN' : 'YOU LOSE';
        document.querySelector(`button.${result ? 'picked' : 'chip-house'}`).classList.add('won');
        setTimeout(() => updateScore(result), 2500);
    }
}

function housePick() {
    const house = document.querySelector('#btnHouse');
    const rng = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
    house.classList.add(`chip-${rng}`);
    house.setAttribute('value', rng);
    house.querySelector('img').setAttribute('src', `./images/icon-${rng}.svg`)
    return rng;
}

function updateScore(status) { // true=win false=lose
    const score = (status) ? parseInt(getScore()) + 1 : parseInt(getScore()) - 1;
    document.querySelector('#score').innerHTML = score; // UI score
    localStorage.setItem('rpslsScore', score);          // localstorage
    return score;
}

function getScore() {
    return (localStorage.getItem('rpslsScore') == null) ? '0'
            : localStorage.getItem('rpslsScore');
}