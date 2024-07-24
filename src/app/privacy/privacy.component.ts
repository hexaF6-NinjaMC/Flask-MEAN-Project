import { Component } from '@angular/core';

@Component({
  selector: 'video-jokebot-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {
  privacyPolicyScriptElement: HTMLScriptElement;
  constructor() {
    try {
      document.body.removeChild(document.body.querySelector('.privacy-policy-script'));
    } catch (e) { /* empty */ }
    this.privacyPolicyScriptElement = document.createElement('script');
    this.privacyPolicyScriptElement.src = 'https://app.termly.io/embed-policy.min.js';
    this.privacyPolicyScriptElement.classList.add('privacy-policy-script');
    document.body.appendChild(this.privacyPolicyScriptElement);
  }
}
