import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }
  formSubmit() {
    console.log(this.user)
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open("Username is required", "", {
        duration: 3000,
      });

      return;
    }
    if (this.user.firstName == '' || this.user.firstName == null) {
      this.snack.open(".firstName is required", "", {
        duration: 3000,
      });

      return;
    }
    if (this.user.lastName == '' || this.user.lastName == null) {
      this.snack.open("lastName is required", "", {
        duration: 3000,
      });

      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open("Password is required", "", {
        duration: 3000,
      });

      return;
    }
    if (this.user.email == '' || this.user.email == null) {
      this.snack.open("email is required", "", {
        duration: 3000,
      });

      return;
    }
    if (this.user.phone == '' || this.user.phone == null) {
      this.snack.open("phone is required", "", {
        duration: 3000,
      });

      return;
    }
    //addUser: UserService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        Swal.fire('Success done', 'User id is ' + data.id, 'success');
      },
      (error) => {
        console.log(error);
        // alert('somthing went wrong')
        this.snack.open('something went wrong', '', {
          duration: 3000,
        });
      }
    )
  }



}
