
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  constructor(private User: UserService, private router: Router,private snackBar: MatSnackBar) {}
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
loginUser() {
  this.User.userLogin(this.loginForm.value).subscribe(
    (data: any) => {     
      localStorage.setItem('Token', data.token);
      localStorage.setItem('Id', data.userCredentials._id)
      console.log(data.userCredentials._id)
      let iden = localStorage.getItem('Token')
      if(iden){
        console.log(iden)
      }
      this.router.navigate([ '/' ]);
    },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      if (err.error.msg) {
        this.snackBar.open(err.error.msg, 'Close');
      } else {
        this.snackBar.open('Please fill in all details!', 'Close');
      }
    }
  );
}
  ngOnInit() {}
}
