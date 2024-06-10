import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('form') form: NgForm;
  submitted = false;
  user = {
    username: '',
    email: '',
    question: '',
    answer: '',
    gender: '',
  };
  defaultQuestion = 'pet';
  answer: string;
  genders = ['Male', 'Female', 'Other'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.form.form.patchValue({ userData: { username: suggestedName } });
  }

  onSubmit() {
    this.submitted = true;
    this.user = {
      username: this.form.value.userData.username,
      email: this.form.value.userData.email,
      question: this.form.value.secret,
      answer: this.form.value.answer,
      gender: this.form.value.gender,
    };
    this.form.reset();
  }
}
