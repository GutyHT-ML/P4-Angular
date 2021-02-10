import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "src/app/components/login/login.component";
import { ForumComponent } from "src/app/components/forum/forum.component";
import { SignupComponent } from './components/signup/signup.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "forum", component: ForumComponent, canActivate:[AuthGuard]},
  {path:"discussion/:id", component: DiscussionComponent, canActivate:[AuthGuard]},

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
