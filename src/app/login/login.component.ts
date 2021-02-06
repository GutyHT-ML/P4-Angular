import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { error } from 'protractor';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // test: string
  email!:string
  password!:string
  constructor(private user: UserService, private router: Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  ngOnInit(): void {
    // this.user.test().subscribe(val => {this.test = val})
  }
  logIn(): void{
    // console.log(this.loginForm.get('email').value)
    if(this.loginForm.valid){
      this.email = this.loginForm.get('email').value
      this.password = this.loginForm.get('password').value
      this.user.logIn(this.email, this.password).subscribe(
        val => {localStorage.setItem('token', val.token)},
        (e:any) => {console.log(e.error['message'])}
        )
      console.log(localStorage.getItem('token'))
      this.router.navigate(['forum'])
    }
  }
}
