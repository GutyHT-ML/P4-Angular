import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name!:string
  email!:string
  password!:string
  constructor(private router: Router, private user: UserService) { }
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  ngOnInit(): void {
  }
  signUp(): void{
    // console.log(this.loginForm.get('email').value)
    if(this.signupForm.valid){
      this.name = this.signupForm.get('name').value
      this.email = this.signupForm.get('email').value
      this.password = this.signupForm.get('password').value
      this.user.signUp(this.name, this.email, this.password).subscribe()
      this.router.navigate(['login'])
    }
  }
}
