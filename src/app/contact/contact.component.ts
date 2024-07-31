/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'video-jokebot-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const value = form.value;
    const name = value.fname + ' ' + value.lname;
    const email = value.email;
    const phone = value.phone;
    const message = value.message;

    console.log('Form submitted:', { name, email, phone, message });
    
    // TODO: Send email or message to the server
    // Example:
    // this.http.post('https://your-server-url.com/send-contact-form', { name, email, phone, message })
    //  .subscribe({
    //     next: (responseData) => console.log(responseData),
    //     error: (error: HttpErrorResponse) => console.error(error),
    //   });

    alert(`Thank you, ${name}! Your message has been sent.`);
    this.onCancel();
  }

  onCancel() {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }
}
