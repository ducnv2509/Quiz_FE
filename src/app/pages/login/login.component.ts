import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };


  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log('login btn clickd !!!');
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required", '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required", '', {
        duration: 3000,
      });
      return;
    }
    //request to server to gen token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);
        // login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            // redirect to Admin or Normal
            if (this.login.getUserRole() == "ADMIN") {
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true)

            } else if (this.login.getUserRole() == "NORMAL") {
              // window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard/0'])
              this.login.loginStatusSubject.next(true)
            } else {
              this.login.logout();
              location.reload();
            }
          }
        )
      },
      (error: any) => {
        console.log("Error")
        console.log(error);
        this.snack.open("Invailed Dtails!! Try again!", '', {
          duration: 3000,
        });
      }
    )
  }
}
