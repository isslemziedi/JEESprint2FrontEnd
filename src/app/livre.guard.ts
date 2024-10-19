import { Injectable } from '@angular/core'; 
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LivreGuard implements CanActivate {
  constructor (private authService: AuthService,
  private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isAdmin())
      return true;
    else
    {
      console.log('Redirection to app-forbidden');
      this.router.navigate(['app-forbidden']);
      return false;
    }
  }
}