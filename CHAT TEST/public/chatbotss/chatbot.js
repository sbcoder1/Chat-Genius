let questions = JSON.parse(localStorage.getItem("questions")) || {};

function sendMessage() {
    const userInput = document.getElementById("userinputs").value.trim();
    const chatBox = document.getElementById("chats");

    if (userInput === "") return;

    chatBox.innerHTML += `<div class='user'><br>User : ${userInput}</div>`;

    const response = questions[userInput];

    if (response) {
        chatBox.innerHTML += `<div class='Niko'>Mr Niko : ${response}</div>`;
    } else {
        chatBox.innerHTML += `<div class='Niko'>Mr Niko : Sorry, I don't understand</div>`;

        const newUserResponse = prompt("Mr Niko: I don't understand. Please provide a response:");

        if (newUserResponse) {
            questions[userInput] = newUserResponse;
            localStorage.setItem("questions", JSON.stringify(questions));
            console.log("New response stored:", questions);

            chatBox.innerHTML += `<div class='Niko'>Mr Niko: Thank you for teaching me!</div>`;
        }
    }

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear the user input field
    document.getElementById("userinputs").value = "";
}

document.getElementById("sendbtn").addEventListener("click", sendMessage);















