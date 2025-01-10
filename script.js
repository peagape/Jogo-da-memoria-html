document.addEventListener('DOMContentLoaded', () => {
    const emojis = ['🐱', '🐶', '🐹', '🐰', '🦊', '🐼', '🐨', '🐯', '🐱', '🐶', '🐹', '🐰', '🦊', '🐼', '🐨', '🐯'];
    let cards = [];
    let flippedCards = [];
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        const gameBoard = document.getElementById('gameBoard');
        shuffle(emojis);
        emojis.forEach(emoji => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === flippedCards[0]) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.emoji;

        // Adicionar som de virar carta
        document.getElementById('flipSound').play();

        if (flippedCards.length === 0) {
            flippedCards.push(this);
        } else if (flippedCards.length === 1) {
            flippedCards.push(this);
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            // Adicionar som para combinação correta
            document.getElementById('matchSound').play();
        } else {
            lockBoard = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                lockBoard = false;
                
                // Adicionar som para combinação errada
                document.getElementById('mismatchSound').play();
            }, 1000);
        }

        flippedCards = [];
        if (document.querySelectorAll('.matched').length === cards.length) {
            setTimeout(() => {
                alert('Parabéns! Você venceu o jogo!');
                // Pode adicionar um som de vitória aqui também, se quiser
            }, 100);
        }

        flippedCards = [];
        if (document.querySelectorAll('.matched').length === cards.length) {
            setTimeout(() => alert('Parabéns! Você venceu o jogo!'), 100);
        }
    }

    createBoard();
});