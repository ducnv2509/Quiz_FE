import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  user: any = null;

  constructor(private login: LoginService) {

  }
  ngOnInit(): void {
    this.user = this.login.getUser();
    // this.login.getCurrentUser().subscribe((user: any) => {
    //   this.user = user;
    // },

    // (error)=>{
    //   alert('error');
    // })
  }

}
