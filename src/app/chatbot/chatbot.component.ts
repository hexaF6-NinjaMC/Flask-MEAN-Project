import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'video-jokebot-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
  standalone: false,
})
export class ChatbotComponent {
  chatbotScriptElement: HTMLScriptElement;
  health: boolean;

  https = inject(HttpClient);
  constructor() {
    this.chatbotScriptElement = document.createElement('script');
    this.chatbotScriptElement.src = '/assets/chatbot.js';
    document.body.appendChild(this.chatbotScriptElement);
    this.healthcheck('https://ai-flask-production.up.railway.app').subscribe(
      (data) => {
        this.health = data.ok;
      },
    );
  }

  healthcheck(url: string): Observable<HttpResponse<object>> {
    return this.https.get(url, { observe: 'response' });
  }
}
