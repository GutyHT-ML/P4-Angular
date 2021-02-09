import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { LoginRes, TokenRes } from "src/app/models/token";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { SignupData } from '../models/signup-data';
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
  signUp(data: SignupData):Observable<any>{
    return this.http.post<any>(this.apiUrl+"signup", data).pipe(
      map((x:any) => x)
    )
  }
  logIn(data: LoginData):Observable<LoginRes>{
    return this.http.post<LoginRes>(this.apiUrl+"login", data).pipe(
      map((x:any) => x)
    )
  }
}
