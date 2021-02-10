import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../models/comment';
import { Post } from '../../models/post';
import { CommentService } from '../../services/comment.service';
import { PostService } from '../../services/post.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  post !: Post
  post_id !:number
  comments !: Comment[]
  constructor(private route: ActivatedRoute,
    private postSvc: PostService,
    private commentSvc: CommentService,
    private router: Router,
    private cookie: CookieService
    ) { }
  commentForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  })

  ngOnInit(): void {
    this.post_id = Number(this.route.snapshot.paramMap.get('id'))
    this.postSvc.getPost(this.post_id).subscribe(
      val => {this.post = val; console.log(val)},
      e => {console.log(e)},
      () => {console.log(this.post.id)}
      )
    this.commentSvc.showComments(this.post_id).subscribe(val=>{this.comments=val})
  }

  submitComment():void{
    let title = this.commentForm.get('title').value
    let description = this.commentForm.get('description').value
    this.commentSvc.createComment(this.post.id, title, description).subscribe(
      val => {this.comments.push(val)},
      (e) => {console.log(e)},
      () => {console.log("Comment submitted")}
    )

  }
  logOut(){
    this.cookie.delete('token')
  }
}
