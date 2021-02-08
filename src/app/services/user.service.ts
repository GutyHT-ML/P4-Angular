import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TokenRes } from "src/app/models/token";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { User } from '../models/user';
import { LoginData } from '../models/login-data';
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
  signUp(user: User):Observable<any>{
    return this.http.post<any>(this.apiUrl+"signup", user).pipe(
      map((x:any) => x)
    )
  }
  logIn(data: LoginData):Observable<TokenRes>{
    return this.http.post<TokenRes>(this.apiUrl+"login", data).pipe(
      map((x:TokenRes) => x)
    )
  }
}
