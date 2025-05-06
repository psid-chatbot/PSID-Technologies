const chatlog = document.getElementById('chatlog');

function sendMessage() {
  const inputField = document.getElementById('userInput');
  const userInput = inputField.value.trim();
  if (!userInput) return;

  appendMessage('user', userInput);
  inputField.value = '';

  appendMessage('bot', "🤖 Typing...");

  setTimeout(() => {
    if (chatlog.lastChild && chatlog.lastChild.classList.contains('bot')) {
      chatlog.removeChild(chatlog.lastChild);
    }

    const response = getBotResponse(userInput);
    appendMessage('bot', response);
  }, 1500);
}

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.className = 'message ' + sender;
  div.innerHTML = message
    .replace(/(https?:\/\/[^\s]+)/g, url => `<a href="${url}" target="_blank">${url}</a>`)
    .replace(/\n/g, "<br>");
  chatlog.appendChild(div);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function handleQuickReply(value) {
  document.getElementById('userInput').value = value;
  sendMessage();
}

function getBotResponse(input) {
  input = input.toLowerCase();

  if (input === '1') {
    document.getElementById('residentialImageContainer').style.display = 'none';
    return "🔧 Our Services include:\n\n" +
           "🏗 Construction\n" +
           "🏢 Property Management\n" +
           "💻 Billing Software & Hardware\n" +
           "🦺 Safety Equipment\n" +
           "🌐 Web Design & Application\n" +
           "📱 Android & iOS Development";
  } else if (input === '2') {
    document.getElementById('residentialImageContainer').style.display = 'none';
    showQuickReplies(['Residential', 'Residential Villa', 'Commercial']);
    return "📋 Please choose a plan type:";
  } else if (input === 'residential') {
    document.getElementById('residentialImageContainer').style.display = 'block';
    return "🏠 Residential Plan includes basic apartment and home setups.";
  } else if (input === 'residential villa') {
    document.getElementById('residentialImageContainer').style.display = 'none';
    return "🏡 Residential Villa Plan includes premium villa construction and design.";
  } else if (input === 'commercial') {
    document.getElementById('residentialImageContainer').style.display = 'none';
    return "🏢 Commercial Plan includes office, warehouse, and business property solutions.";
  } else if (input === '3') {
    document.getElementById('residentialImageContainer').style.display = 'none';
    return "📍 Our Location:\n🏠 PSID Technologies, Bengaluru, Karnataka\n\n" +
           "🗺 <a href='https://www.google.com/maps/place/Bengaluru,+Karnataka' target='_blank'>Open Location in Maps</a>";
  }

  document.getElementById('residentialImageContainer').style.display = 'none';
  showQuickReplies(['1', '2', '3']);
  return "🤖 I'm here to help! Please choose an option:\n\n" +
         "1️⃣ View Our Services\n" +
         "2️⃣ View Our Plans\n" +
         "3️⃣ Contact Us / Find Our Location";
}

function showQuickReplies(options) {
  const container = document.querySelector('.quick-buttons');
  container.innerHTML = '';

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => handleQuickReply(option.toLowerCase());
    container.appendChild(btn);
  });
}

document.getElementById("userInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

window.onload = function () {
  appendMessage('bot', "👋 Hello! Welcome to Property Services!");
  appendMessage('bot', "Please choose an option:\n\n" +
    "1️⃣ View Our Services\n" +
    "2️⃣ View Our Plans\n" +
    "3️⃣ Contact Us / Find Our Location");
};
