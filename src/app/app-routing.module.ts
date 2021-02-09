import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "src/app/components/login/login.component";
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},

  {path: "home", component: HomeComponent},
  {path: "detail/:id", component: DetailComponent},

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
