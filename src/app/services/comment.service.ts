import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) { }
}
