import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { PcData } from 'src/app/models/pc-data';
import { Post, Comment, User } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  editPostForm!: FormGroup;
  editCommentForm!: FormGroup;
  commentForm!: FormGroup;
  post !: Post
  post_id !:number
  postData!: PcData
  comEditData!: PcData
  comData!: PcData
  id!:Number
  editing:Boolean = false
  editingCom:Boolean = false
  selComment!:Comment

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService,
              private commentService: CommentService, private formB:FormBuilder, private cookie: CookieService){
      this.buildForm();
  }

  ngOnInit(): void {
    this.post_id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = Number(this.cookie.get('id'));
    this.postService.getPost(this.post_id).subscribe(
      val => {
        this.post = val;
        this.post.comments = val.comments.reverse()
        this.post.comments.forEach(comment => {
          comment.editing = false;
        });
        console.log(this.post);
      },
      error => {
        console.log(error)
      });
  }

  buildForm(): void {
    this.editPostForm = this.formB.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.editCommentForm = this.formB.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.commentForm = this.formB.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  //Edit Post
  editPost(): void{
    if(this.editPostForm.invalid){
      return
    }
    this.setEditPost()
    this.postService.editPost(this.post.id, this.postData).pipe(first()).subscribe(
      () => {
        this.post.title = this.postData.title;
        this.post.description = this.postData.description;
      },
      error => {
        console.log(error)
      })
    this.editingState();
  }
  setEditPost(): void{
    this.postData = {
      title: this.editPostForm.get('title').value,
      description: this.editPostForm.get('description').value
    }
  }
  deletePost():void{
    this.postService.deletePost(this.post.id).pipe(first()).subscribe(
      () => {
        this.router.navigate(['/home'])
      },
      error => {
        console.log(error)
      })
  }
  editingState():void{
    this.editing = !this.editing
    console.log(this.editing)
  }

  //New Comment
  saveComment():void{
    if(this.commentForm.invalid){
      return
    }
    this.setComment()
    this.commentService.createComment(this.post.id, this.comData).subscribe(
      val => {
        val.editing = false;
        this.post.comments.unshift(val);
        console.log(val)
      },
      error => {
        console.log(error)
      });
  }
  setComment(): void{
    this.comData = {
      title: this.commentForm.get('title').value,
      description: this.commentForm.get('description').value
    }
  }


  //Edit Comment
  editComment(comment:Comment):void{
    this.selComment = comment;
    if(this.editCommentForm.invalid){
      return
    }
    this.setEditComment()
    this.commentService.editComment(this.post.id, this.selComment.id, this.comEditData).subscribe(
      () => {
        this.selComment.title = this.comEditData.title;
        this.selComment.description = this.comEditData.description;
        this.editingComState(comment);
      },
      error => {
        console.log(error)
      });
  }
  setEditComment(): void{
    this.comEditData = {
      title: this.editCommentForm.get('title').value,
      description: this.editCommentForm.get('description').value
    }
  }
  editingComState(comment:Comment):void{
    comment.editing = !comment.editing
    console.log(comment.editing)
  }
  deleteComment(comment:Comment):void{
    this.selComment = comment;
    this.commentService.deleteComment(this.post.id, this.selComment.id).pipe(first()).subscribe(
      () => {
        this.post.comments = this.arrayRemove(this.post.comments, this.selComment)
      },
      error => {
        console.log(error)
      })
  }

  logOut(){
    this.cookie.delete('token')
    this.cookie.delete('username')
    this.cookie.delete('id')
  }

  arrayRemove(arr, value){
    return arr.filter(function(ele){
        return ele != value;
    });
}


}
