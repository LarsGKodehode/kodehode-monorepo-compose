import { safeQuery } from './utilities.js'

console.log("Connecting to Room")
import { connect, publish } from './message-bus.js'
console.log("Message system connected")

/**@type {HTMLOListElement} */
const chatBox = safeQuery(document, "[data-message='chat-box']");
/**@type {HTMLFormElement} */
const chatForm = safeQuery(document, "[data-message='chat-form']");
/**@type {HTMLTemplateElement} */
const chatMessageTemplate = safeQuery(document, "[data-message='message-template']");

// Set User Info
/**@type {User} */
const user = {
  id: crypto.randomUUID(),
  alias: "Anon",
  avatar: new URL("https://plus.unsplash.com/premium_photo-1722111091429-dd3dc55979d3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8")
}

// Hook up function(s) to the DOM
chatForm.addEventListener("submit", handleSend)
const connection = connect((message) => {
  appendMessage(message)
  chatScrollToBottom()
})

/**
 * Appends a message to the chat box
 * 
 * @param {ChatMessage} message 
 */
function appendMessage(message) {
  const isSelf = message.sender.id === user.id
  /**@type {HTMLLIElement} */
  const newMessageElement = chatMessageTemplate.content.cloneNode(true)

  // The <li> for the Card/Container
  /**@type {HTMLLIElement} */
  const card = safeQuery(newMessageElement, "[data-message='chat-card']")
  // Swap rendered side, if from this user
  if (isSelf) {
    card.classList.replace("self-start", "self-end")
  }
  
  // The <img> for the Users Avatar
  /**@type {HTMLImageElement} */
  const avatar = safeQuery(newMessageElement, "[data-message='avatar-src']")
  avatar.src = message.sender.avatar
  avatar.alt = `Avatar for ${message.sender.alias}`
  
  // The <p> for the Users alias
  /**@type {HTMLParagraphElement} */
  const alias = safeQuery(newMessageElement, "[data-message='sender']")
  alias.textContent = message.sender.alias
  
  // The <p> for the content
  /**@type {HTMLParagraphElement} */
  const content = safeQuery(newMessageElement, "[data-message='content']")
  content.textContent = message.content
  
  // The <p> for the Timestamp
  /**@type {HTMLParagraphElement} */
  const timeStamp = safeQuery(newMessageElement, "[data-message='time-stamp']")
  timeStamp.textContent = `${message.timeStamp.getHours()}:${message.timeStamp.getHours()}`;

  chatBox.append(newMessageElement)
}

/**
 * Move the chatbox view to the bottom
 */
function chatScrollToBottom() {
  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth"
  })
}

/**
 * Coordinates the submission of a message
 * 
 * @param {SubmitEvent} event 
 */
function handleSend(event) {
  event.preventDefault(); // Stop refreshing the page

  const formData = new FormData(chatForm)
  formData.forEach(console.log)
  
  const message = formData.get("message").trim();
  if (!message) return // Just ignore empty send requests

  publish({
    sender: user,
    content: message,
    timeStamp: new Date(),
  })

  // Finaly clear out message box
  chatForm.reset()
}