import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  editPost(id:number, title:string, description:string): Observable<Post>{
    return this.http.put<Post>(this.apiUrl+"posts/"+id+"/edit", {title, description})
  }
  deletePost(id:number): Observable<any>{
    return this.http.delete<any>(this.apiUrl+"posts/"+id+"/delete")
  }
  getPost(id:number):Observable<Post>{
    return this.http.get<Post>(this.apiUrl+"posts/"+id)
  }
  showPosts(): Observable<Post[]>{
    console.log(this.apiUrl)
    return this.http.get<Post[]>(this.apiUrl+"posts/show")
  }
  createPost(title:string, description:string): Observable<Post>{
    return this.http.post<Post>(this.apiUrl+"posts/create", {title, description})
  }
}
