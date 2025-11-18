/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SendEmailService } from './send-email.service';

@Component({
    selector: 'video-jokebot-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    standalone: false
})
export class ContactComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private emailService: SendEmailService,
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const value = form.value;
    const name = value.fname + ' ' + value.lname;
    const email = value.email as string;
    const phone = value.phone as string;
    const message = value.message as string;

    this.emailService.sendEmail(name, email, phone, message);

    alert(`Thank you, ${name}! Your message has been sent.`);
    this.onCancel();
  }

  onCancel() {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }
}
