import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  user: User;
  hide = true;
  /*name!:string
  email!:string
  password!:string*/

  constructor(private router: Router, private userService: UserService, private formB:FormBuilder) {
    this.buildForm();
  }

  /*signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })*/
  ngOnInit(): void {
  }


  signUp(): void {
    if(this.signUpForm.invalid){
      return
    }
    this.setUser()
    this.userService.signUp(this.user).pipe(first()).subscribe(
      () => {
        this.router.navigate(['/login'])
      },
      error => {
        console.log(error)
      })
  }

  buildForm(): void {
    this.signUpForm = this.formB.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setUser(): void{
    this.user = {
      username: this.signUpForm.get('username').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value
    }
  }
}
