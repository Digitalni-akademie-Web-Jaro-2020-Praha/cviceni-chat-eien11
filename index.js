'use strict';

/* ========== PŘIJÍMÁNÍ ZPRÁV ========== */

let messagesElement = document.querySelector('#messages');

const renderMessage = (name, message, date) => {
  // @TODO: funkce vracející HTML zprávy
  const messageElm = document.createElement('div');
  messageElm.innerHTML =
    (`
        <div class="card mt-3 mb-3">
					<div class="card-body">
						<h5 class="card-title">
							${name}
							<small class="text-muted">${date}</small>
						</h5>
						<p class="card-text">${message}</p>
					</div>
				</div>
  `);
  return messageElm;
};

const renderMessages = (messages) => {
  // @TODO: funkce vypisující zprávy na stránku
  messagesElement.innerHTML = '';
  for (let i = 0; i < messages.length; i++) {
    const message = renderMessage(messages[i].name, messages[i].message, messages[i].date);
    messagesElement.appendChild(message);
  }
};


const updateMessages = () => {
  // @TODO: funkce stahující zprávy ze server a přidávající je na stránku
  fetch('https://czechichat.herokuapp.com/api/list-messages')
    .then(response => response.json())
    .then(data => renderMessages(data.messages))

};

setInterval(updateMessages, 2000); // Každé dvě sekundy zavolá updateMessages

/* ========== ODESÍLÁNÍ ZPRÁV ========== */

const nameInputElement = document.querySelector('#name-input');
const messageInputElement = document.querySelector('#message-input');

const onSubmit = (event) => {
  event.preventDefault(); // Zamezí přesměrování na jinou stránku při odesílání formuláře

  console.log(
    'Data:',
    JSON.stringify({
      name: nameInputElement.value,
      message: messageInputElement.value,
    }),
  );

  // @TODO: odešli zprávu na server
};

document.querySelector('#send-form').addEventListener('submit', onSubmit);
