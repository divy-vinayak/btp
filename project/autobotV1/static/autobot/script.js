function updateTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var timeString = hours + ':' + minutes;

  var timeElement = document.getElementById('welcome-msg');
  if (timeElement) {
      timeElement.innerHTML = timeString;
  }
}

// Call updateTime when the DOM is fully loaded
window.onload = updateTime;
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
const PERSON_IMG = "https://media.licdn.com/dms/image/C4D03AQGvGUEArgysxw/profile-displayphoto-shrink_200_200/0/1661039148733?e=1703721600&v=beta&t=2lTs8I8rIS2w9prfVep0LiGr0KZ3N7a1nKo5wtLZ7Pc";
const BOT_NAME = "AutoBotV1";
const PERSON_NAME = "Divy";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  addLoader();
  msgerInput.value = "";

  botResponse({'msg':msgText});
});

function addLoader() {
  const msgHTML = `
    <div class="msg left-msg" id="bot-loader">
      <div class="msg-img" style="background-image: url(${BOT_IMG})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
           <div class="msg-info-name">${BOT_NAME}</div>
        </div>

        <div class="msg-text">Loading...</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function removeLoader(){
  const element = document.getElementById("bot-loader");
  element.remove();
}

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

async function botResponse(data = {}) {
  url = "http://localhost:8000/v1/autobot/res";
  let response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  
  response = await response.json();
  const msgText = response['result']['msg'];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    removeLoader();
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
