// Conectar ao servidor
const socket = io('http://157.245.82.125:3000'); // Substitua pelo IP e porta do seu servidor

// Referências aos elementos do DOM
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

// Função para adicionar uma mensagem ao chat
function adicionarMensagem(mensagem) {
    const msgElement = document.createElement('div');
    msgElement.textContent = mensagem;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Rolagem automática para a última mensagem
}

// Ao receber uma mensagem do servidor
socket.on('chat message', (mensagem) => {
    adicionarMensagem(mensagem);
    
    // Notificação básica (semelhante ao `notificar_usuario` do Python)
    if (!document.hasFocus()) {
        document.title = `Nova mensagem!`;
        // Aqui você poderia adicionar mais recursos de notificação, mas no browser isso é limitado.
    }
});

// Ao enviar uma mensagem
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (chatInput.value.trim()) {
        socket.emit('chat message', chatInput.value);
        adicionarMensagem(`Você: ${chatInput.value}`); // Mostrar a mensagem localmente
        chatInput.value = '';
    }
});

// Resetar notificações quando a janela ganha foco (muito básico)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        document.title = 'Chat';
    }
});