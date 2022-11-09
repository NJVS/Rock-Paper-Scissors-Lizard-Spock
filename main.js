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
        }, 2000);
    });
});