import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TokenRes } from "src/app/interfaces/token";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  test():Observable<any>{
    return this.http.get<any>(this.apiUrl+"test").pipe(
      map((x:any) => x.greeting)
    )
  }
  signUp(username:string ,email:string, password:string):Observable<any>{
    return this.http.post<any>(this.apiUrl+"signup", {username, email, password}).pipe(
      map((x:any) => x)
    )
  }
  logIn(email:string, password:string):Observable<TokenRes>{
    return this.http.post<TokenRes>(this.apiUrl+"login", {email:email, password:password}).pipe(
      map((x:TokenRes) => x)
    )
  }
}
