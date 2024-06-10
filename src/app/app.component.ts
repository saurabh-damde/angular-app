import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  forbiddenUsernames = ['god', 'devil'];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.checkForbiddenUsernames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.email, Validators.required],
          this.checkForbiddenEmails
        ),
      }),
      gender: new FormControl(null, Validators.required),
      hobbies: new FormArray([]),
    });
  }

  onAddHobby() {
    (<FormArray>this.myForm.get('hobbies')).push(
      new FormControl(null, Validators.required)
    );
  }

  getHobbies() {
    return <FormArray>this.myForm.get('hobbies');
  }

  checkForbiddenUsernames(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUsernames.includes(control.value?.toLowerCase())) {
      return { usernameIsForbidden: true };
    }
    return null;
  }

  checkForbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value.toLowerCase() === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset();
  }
}
