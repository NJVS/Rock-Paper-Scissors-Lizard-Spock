// USING KEYFRAME
document.addEventListener('DOMContentLoaded', () => {

    //rules
    document.querySelector('#showRules').addEventListener('click', () => {
        document.querySelector('.rules').classList.add('show');
    });
    document.querySelector('#closeRules').addEventListener('click', () => {
        document.querySelector('.rules').classList.remove('show');
    });

    // game
    document.querySelector('#board').addEventListener('click', event => {
        const picked = event.target;
        const board = event.currentTarget;
        if (!picked.classList.contains('chip')) return;

        // start
        start(picked, document.querySelector('#btnHouse'));

        // clasess
        board.classList.add('game-start');  // board
        picked.classList.add('picked');     // chip

        // game end
        setTimeout(() => board.classList.add('game-end'), 3000);
    });

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


function start(cp, ch) {
    const h_val = housePick(ch);
    const p_val = cp.value;
    const score = document.querySelector('#score');
    let result;

    if (p_val == h_val) {
        result = 'DRAW';
    } else {
        switch (p_val) {
            case 'rock':
                result = ['scissors', 'lizard'].indexOf(h_val) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'paper':
                result = ['rock', 'spock'].indexOf(h_val) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'scissors':
                result = ['paper', 'lizard'].indexOf(h_val) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'lizard':
                result = ['paper', 'spock'].indexOf(h_val) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
            case 'spock':
                result = ['scissors', 'rock'].indexOf(h_val) == -1 ? 'YOU LOSE' : 'YOU WIN';
                break;
        };
    }

    document.querySelector('#result').innerHTML = result;

    if (result == 'YOU WIN') {
        cp.classList.add('won');
        setTimeout(() => score.innerHTML = parseInt(score.innerHTML) + 1, 2500);
        
    } else if (result == 'YOU LOSE') {
        ch.classList.add('won');
        setTimeout(() => score.innerHTML = parseInt(score.innerHTML) - 1, 2500);
    }
}

function housePick(house) {
    const rng = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
    house.classList.add(`chip-${rng}`);
    house.setAttribute('value', rng);
    house.querySelector('img').setAttribute('src', `./images/icon-${rng}.svg`)
    return rng;
}