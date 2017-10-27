import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  errorFlag = false;
  errorMsg = 'You have an error';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    const p1 = this.form.value.password;
    const p2 = this.form.value.verify;
    if (p1 !== p2) {
      this.errorFlag = true;
      this.errorMsg = 'Passwords do not match';
      return;
    }
    this.userService.findUserByUsername(this.form.value.username).subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        this.errorFlag = true;
        this.errorMsg = 'Username already exists';
        return;
      }
      this.userService.createUser({
        'username': this.form.value.username,
        'password': p1
      }).subscribe((data2: any) => {
        return this.router.navigate(['/user', data2._id]);
      });
    });
  }
}
