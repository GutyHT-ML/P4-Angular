import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment : Comment
  editor = false
  constructor(private commentSvc: CommentService) { }
  editForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl
  })
  ngOnInit(): void {
  }

  enableEditor(){
    this.editor = !this.editor
    console.log(this.editor)
  }
  saveComment(){
    let title = this.editForm.get('title').value
    let description = this.editForm.get('description').value
    this.commentSvc.editComment(this.comment.post_id, this.comment.id, title, description).subscribe()
  }
  deleteComment(){
    this.commentSvc.deleteComment(this.comment.post_id, this.comment.id).subscribe(val=> {console.log(val)})
  }
}
