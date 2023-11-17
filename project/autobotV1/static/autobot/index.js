document.getElementById('send-btn').addEventListener('click', function() {
  const message = document.getElementById('message-input').value;
  if (message) {
      // Display the message in the chat window
      displayMessage(message, 'user');

      // Clear the input field
      document.getElementById('message-input').value = '';

      // Send the message to the server
      sendMessageToServer(message);
  }
});

function displayMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
  chatMessages.appendChild(messageDiv);
}

function sendMessageToServer(message) {
  // Display an animated loader here

  fetch('YOUR_SERVER_URL', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
  })
  .then(response => response.json())
  .then(data => {
      // Remove the animated loader
      // Display the response in the chat window
      displayMessage(data.reply, 'bot');
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

// Add event listener and function for dark mode toggle
