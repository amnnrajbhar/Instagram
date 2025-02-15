// app.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;
  userInfo: any;
  membersList: any[] = [];
  constructor(private fb: FormBuilder,private http: HttpService,private router: Router,) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     console.log('Form Submitted', this.loginForm.value);
  //     alert('Login successful!');
  //   }
  // }
  getMembersList() {
    this.http.getMembersList().subscribe((data: any) => {
      this.membersList = data;
      console.log(this.membersList);
    });
  }
  onSubmit() {
    debugger;
    let form=this.loginForm;
    this.userInfo = this.membersList.filter(m => m.username == form.value.username);
    if (form.value.username != '' && form.value.password != '') {
      if (this.userInfo.length > 0) {
        if (this.userInfo[0].username == form.value.username && this.userInfo[0].password == form.value.password) {
          this.router.navigate(['/https://www.instagram.com/accounts/emailsignup/?hl=en']);
          //localStorage.setItem("loginUser",form.value.username);
        } else {
          alert('Invalid Credentials');
        }
      } else {
        alert('User not found please signup');
      }
    } else {
      alert('Please enter username & password')
    }

  }
}
