import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  username: string;
  password: string;
  user: any;
  errorFlag: boolean;

  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.findUserByCredentials(this.username, this.password).subscribe((data: any) => {
      this.user = data;
      if (Object.keys(data).length === 0) {
        this.errorFlag = true;
        this.errorMsg = 'Username/Password combination doesn\'t exist';
        return;
      }
      const link: string = '/user/' + this.user._id;
      return this.router.navigate([link]);
    });
  }
}
