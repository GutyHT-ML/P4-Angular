import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) { }

  showComments(id:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.apiUrl+"posts/"+id+"/comments")
  }
  createComment(post_id:number, title:string, description:string):Observable<Comment>{
    return this.http.post<Comment>(
      this.apiUrl+"posts/"+post_id+"/comments/create",
      {title, description}
    )
  }
  editComment(post_id:number, comment_id:number, title:string, description:string):Observable<Comment>{
    return this.http.put<Comment>(
      this.apiUrl+"posts/"+post_id+"/comments/"+comment_id+"/edit",
      {title, description}
    )
  }
  deleteComment(post_id:number, comment_id:number):Observable<any>{
    return this.http.delete<any>(
      this.apiUrl+"posts/"+post_id+"/comments/"+comment_id+"/delete"
    )
  }
}
