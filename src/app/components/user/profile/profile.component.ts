import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  user = {};
  errorFlag = false;
  errorMsg = 'You have an error';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.userService.findUserById(this.userId).subscribe((data: any) => {
            this.user = data;
          });
        }
      );
  }

  submit() {
    this.userService.findUserByUsername(this.form.value.username).subscribe((data: any) => {
      if (data != null && data._id !== this.userId) {
        this.errorFlag = true;
        this.errorMsg = 'That username is already taken';
        return;
      }
      this.user['username'] = this.form.value.username;
      this.user['email'] = this.form.value.email;
      this.user['firstName'] = this.form.value.firstName;
      this.user['lastName'] = this.form.value.lastName;
      this.userService.updateUser(this.userId, this.user).subscribe(() => {
      });
      this.errorMsg = 'User Successfully Updated!';
      this.errorFlag = true;
      return this.router.navigate(['/user', this.userId]);
    });
  }
}
