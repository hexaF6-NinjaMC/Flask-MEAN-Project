class Chat {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox-button"),
      chatBox: document.querySelector(".chatbox-support"),
      sendButton: document.querySelector(".send-button"),
    };
    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;
    openButton.addEventListener("click", () => this.toggleState(chatBox));
    sendButton.addEventListener("click", () => this.onSendButton(chatBox));
    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;
    // show or hide the box
    chatbox.classList.toggle("chatbox-active");
  }

  onSendButton(chatbox) {
    const textField = chatbox.querySelector("input");
    let text = textField.value;
    if (text === "") {
      return;
    }

    let msg1 = {
      name: "User",
      message: text,
    };
    this.messages.push(msg1);

    fetch("https://ai-flask-m190.onrender.com/chatbot/predict", {
      method: "POST",
      body: JSON.stringify({ message: text }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "Algee", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = "";
      })
      .then(() => {
        this.messages = [];
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }

  updateChatText(chatbox) {
    const chatMessage = chatbox.querySelector(".chatbox-messages");
    const chat_html = document.querySelector(".chatbox-content");
    this.messages.slice().forEach((item) => {
      let convo_html = document.createElement("div");
      if (item.name === "Algee") {
        convo_html.insertAdjacentHTML("beforeend", `Algee: ${item.message}`);
        convo_html.classList.add("messages-item", "messages-item-visitor");
      } else {
        convo_html.textContent = `You: ${item.message}`;
        convo_html.classList.add("messages-item", "messages-item-operator");
      }
      chat_html.insertAdjacentElement("beforeend", convo_html);
      chatMessage.appendChild(chat_html);
    });
    chatMessage.scrollTo({
      top: chatMessage.scrollHeight,
      left: 0,
      behavior: "instant",
    });
  }
}

const chatbot = new Chat();
chatbot.display();
