import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Comment } from '../models/post';
import { PcData } from '../models/pc-data';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) { }

  showComments(id:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.apiUrl+"posts/"+id+"/comments").pipe(
      map((x:any) => x))
  }
  createComment(post_id:number, data:PcData):Observable<Comment>{
    return this.http.post<Comment>(
      this.apiUrl+"posts/"+post_id+"/comments/create",data
    )
  }
  editComment(post_id:number, comment_id:number, data:PcData):Observable<Comment>{
    return this.http.put<Comment>(
      this.apiUrl+"posts/"+post_id+"/comments/"+comment_id+"/edit",data
    )
  }
  deleteComment(post_id:number, comment_id:number):Observable<any>{
    return this.http.delete<any>(
      this.apiUrl+"posts/"+post_id+"/comments/"+comment_id+"/delete"
    )
  }
}
