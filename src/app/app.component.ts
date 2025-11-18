import { Component, Input } from '@angular/core';

@Component({
    selector: 'video-jokebot-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  @Input() ngSwitch: string;

  btnScriptElement: HTMLScriptElement;
  title = 'video-jokebot';
  constructor() {
    this.btnScriptElement = document.createElement('script');
    this.btnScriptElement.src = '/assets/toggleTheme.js';
    document.body.appendChild(this.btnScriptElement);
  }
}
