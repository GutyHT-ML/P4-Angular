import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PcData } from 'src/app/models/pc-data';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts!:Post[]
  selPost!:Post
  postData!:PcData
  username:String = localStorage.getItem('username')
  postForm:FormGroup

  constructor(private postService: PostService, private router:Router, private formB:FormBuilder) {
    this.buildForm()
   }

  ngOnInit(): void {
    this.postService.showPosts().subscribe(
      val => {
        this.posts = val.reverse()
      },
      error => {
        console.log(error)
      });
  }
  submitPost(){
    if(this.postForm.invalid){
      return
    }
    this.setPost()
    this.postService.createPost(this.postData).subscribe(
      val => {
        this.posts.unshift(val);
      },
      error => {
        console.log(error)
      });
  }
  setPost(): void{
    this.postData = {
      title: this.postForm.get('title').value,
      description: this.postForm.get('description').value
    }
  }

  buildForm(): void {
    this.postForm = this.formB.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  onSelect(post:Post):void{
    this.selPost = post;
    this.router.navigate(['detail', this.selPost.id])
  }

}
