import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:Auth, private router:Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
   ): Promise<boolean> {

    if(!!!this.auth.currentUser){this.router.navigate(['portal']); return false;} else {
    const user=this.auth.currentUser;
    console.log("verification: ", this.auth.currentUser.emailVerified)
    return user.emailVerified;
    }
  }
}
