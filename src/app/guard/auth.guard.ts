import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { TokenInterceptorService } from '../services/tokeninterceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private token : TokenInterceptorService, private router: Router, private cookie: CookieService){}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const toke= this.cookie.get('token')
    if(toke == null || toke==''){
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }
}
