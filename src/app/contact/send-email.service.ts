import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email.model';
import { environment } from '../../environments/environment';

// Create a service that can be used to send information in an email

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  private emailServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, phone: string, message: string) {
    const senderEmail = new Email(name, phone, email, message);

    this.http
      .post<{
        message: string;
      }>(`${this.emailServerUrl}/api/send-contact`, { ...senderEmail })
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
