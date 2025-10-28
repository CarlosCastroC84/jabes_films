import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactPageComponent {
  submitted = false;
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
    // Aquí podría integrarse un servicio real de envío.
    form.resetForm();
  }
}
