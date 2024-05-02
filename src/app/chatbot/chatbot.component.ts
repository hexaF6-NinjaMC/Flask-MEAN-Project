import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  chatbotScriptElement: HTMLScriptElement;
  constructor() {
    this.chatbotScriptElement = document.createElement('script');
    this.chatbotScriptElement.src = '/assets/chatbot.js';
    document.body.appendChild(this.chatbotScriptElement);
  }
}
