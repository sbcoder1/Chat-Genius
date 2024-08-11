document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('new-chat-btn').addEventListener('click', startNewChat);
document.getElementById('light-mode-btn').addEventListener('click', toggleLightMode);
document.getElementById('history-btn').addEventListener('click', displayHistory);

let chatHistory = [];
let isLightMode = false;

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('User', userInput);
    chatHistory.push({ sender: 'User', message: userInput });

    document.getElementById('user-input').value = '';

    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        const formattedResponse = formatResponse(data.reply);
        appendMessage('NikoAI', formattedResponse);
        chatHistory.push({ sender: 'NikoAI', message: formattedResponse });
    })
    .catch(error => console.error('Error:', error));
}

function appendMessage(sender, message) {
    const output = document.getElementById('output');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    let iconSrc = '';   

    if (sender === 'User') {
        messageElement.classList.add('user-message');
        iconSrc = 'https://drive.google.com/thumbnail?sz=w1000&id=1F95iar90ifCmZy0IRk4zvXqNU9F42zsl'; //  user icon
    } else {
        messageElement.classList.add('chatgpt-message');
        iconSrc = 'https://drive.google.com/thumbnail?sz=w1000&id=1Kqu5EpobhxA9ZXs50Eo-S-Ir2xUSS1J8'; //  NikoAI (ChatGPT) icon
    }

    messageElement.innerHTML = `
        <div class="message-content">
            <img src="${iconSrc}" class="message-icon" alt="${sender} icon">
            <div class="message-text">
                <strong>${sender}:</strong> ${message}
            </div>
        </div>
    `;
    
    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight;
}

function formatResponse(text) {
    if (text.includes('Definition:')) {
        return text
            .split('\n')
            .map((line, index) => {
                if (line.startsWith('Definition:')) return `<strong>${line}</strong>`;
                if (line.startsWith('Purpose:')) return `<strong>${line}</strong>`;
                if (line.startsWith('Key Concepts:')) return `<strong>${line}</strong>`;
                if (line.startsWith('Types of Cryptography:')) return `<strong>${line}</strong>`;
                if (line.startsWith('Applications:')) return `<strong>${line}</strong>`;
                if (line.startsWith('Challenges:')) return `<strong>${line}</strong>`;
                
                // Convert lines to numbered list items
                return `<p>${index + 1}. ${line}</p>`;
            })
            .join('');
    }
    return text.replace(/\n/g, '<br>');
}

function displayHistory() {
    const historyWindow = document.createElement('div');
    historyWindow.id = 'history-window';

    const historyContent = chatHistory.map(entry => `
        <div class="history-entry">
            <strong>${entry.sender}:</strong> <span>${entry.message}</span>
        </div>
    `).join('');

    historyWindow.innerHTML = `
        <div id="history-header">
            <h2>Chat History</h2>
            <button id="close-history-btn">Close</button>
        </div>
        <div id="history-content">
            ${historyContent}
        </div>
    `;
    
    document.body.appendChild(historyWindow);

    // Close button functionality
    document.getElementById('close-history-btn').addEventListener('click', () => {
        document.body.removeChild(historyWindow);
    });
}

function startNewChat() {
    chatHistory = [];
    document.getElementById('output').innerHTML = '';
}

function toggleLightMode() {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode', isLightMode);
}





document.getElementById('chatbots').addEventListener('click', function() {
    window.open('chatbotss/chatbot.html', '_blank', 'width=400,height=600');
}); 





