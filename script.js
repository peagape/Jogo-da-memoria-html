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
            document.getElementById('matchSound').play();
        } else {
            lockBoard = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                lockBoard = false;
                document.getElementById('mismatchSound').play();
            }, 1000);
        }

        flippedCards = [];
        if (document.querySelectorAll('.matched').length === cards.length) {
            setTimeout(() => {
                const winMessage = document.getElementById('winMessage');
                winMessage.style.display = 'block';
                
                document.getElementById('restartButton').addEventListener('click', restartGame);
            }, 1000);
        }
    }

    function restartGame() {
        // Limpa o tabuleiro e recria o jogo
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        lockBoard = false;
        document.getElementById('winMessage').style.display = 'none';
        createBoard();
    }

    createBoard();
});