import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "src/app/login/login.component";
import { ForumComponent } from "src/app/forum/forum.component";
import { SignupComponent } from './signup/signup.component';
import { DiscussionComponent } from './discussion/discussion.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component:SignupComponent},
  {path: "forum", component: ForumComponent},
  {path:"discussion/:id", component: DiscussionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
