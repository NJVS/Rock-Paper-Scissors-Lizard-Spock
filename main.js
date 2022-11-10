document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#gameBoard').addEventListener('click', event => {
        const pickedChip = event.target.closest('button.chip');
        const houseChip = event.currentTarget.querySelector('.chip-house');

        if (!pickedChip) return;

        // board close
        event.currentTarget.classList.add('game-start');
        // picked chip
        pickedChip.classList.add('picked');

        // hide other buttons
        event.currentTarget.querySelectorAll('.chip').forEach(btn => {
            if (!btn.classList.contains('picked') && !btn.classList.contains('chip-house')) {
                btn.classList.add('unpicked');
            }
        });


        // check result
        setTimeout(() => {
            pickedChip.classList.add('result');
            pickedChip.setAttribute('disabled', 'true');
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
                }, 2500);
            }         
        });

        // setTimeout(() => {
        //     document.querySelectorAll('button.unpicked').forEach(btn => btn.classList.remove('unpicked')); 
        // }, 2500);
    });
});