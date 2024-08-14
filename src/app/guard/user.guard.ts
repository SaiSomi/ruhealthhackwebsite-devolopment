import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';

import {AuthService} from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    return inject(AuthService).canActivate(route, state)
};
