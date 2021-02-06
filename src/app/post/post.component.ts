import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post
  editor = false
  constructor(private postSvc:PostService, private router:Router) { }
  editForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  })
  ngOnInit(): void {
  }
  enableEditor():void{
    this.editor = !this.editor
  }
  savePost():void{
    let title = this.editForm.get('title').value
    let description = this.editForm.get('description').value
    console.log(title)
    console.log(description)
    this.postSvc.editPost(this.post.id, title, description).subscribe()
    this.editor = false
  }
  deletePost():void{
    this.postSvc.deletePost(this.post.id).subscribe(val => {console.log(val)})
  }
}
