import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { error } from 'protractor';
import { LoginData } from 'src/app/models/login-data';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // test: string
  email!:string
  password!:string

  logInForm: FormGroup;
  data: LoginData;
  hide = true;
  constructor(private userService: UserService, private router: Router, private formB: FormBuilder, private cookie: CookieService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  logIn(): void{
    if(this.logInForm.invalid){
      return ;
    }
    this.setData()
    this.userService.logIn(this.data).subscribe(
      val => {
        /*
        localStorage.setItem('token', val.token.token)
        localStorage.setItem('username', val.user.username)
        localStorage.setItem('id', String(val.user.id))
        this.router.navigate(['home'])
        console.log(localStorage.getItem('token'))*/
        this.cookie.set('token', val.token.token)
        this.cookie.set('username', val.user.username)
        this.cookie.set('id', String(val.user.id))
        this.router.navigate(['home'])
        console.log("Token: "+this.cookie.get('token'))
      },
      error => {
        console.log(error)
      })
  }

  buildForm(): void {
    this.logInForm = this.formB.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setData(): void{
    this.data = {
      email: this.logInForm.get('email').value,
      password: this.logInForm.get('password').value
    }
  }
}
