import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "src/app/components/login/login.component";
import { ForumComponent } from "src/app/components/forum/forum.component";
import { SignupComponent } from './components/signup/signup.component';
import { DiscussionComponent } from './components/discussion/discussion.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "forum", component: ForumComponent},
  {path:"discussion/:id", component: DiscussionComponent},

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
