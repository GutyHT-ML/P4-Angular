import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts!:Post[]
  constructor(private post: PostService) { }
  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  ngOnInit(): void {
    this.post.showPosts().subscribe(val => {this.posts = val})
  }
  submitPost(){
    let title = this.postForm.get('title').value
    let description = this.postForm.get('description').value
    this.post.createPost(title, description).subscribe(val => {console.log(val)})
  }
}