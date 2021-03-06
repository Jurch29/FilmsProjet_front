import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        let checker = (arr, target) => target.every(v => arr.includes(v));
        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles && !checker(currentUser.roles, route.data.roles)) {
                // role not authorised so redirect to home page
                console.log(route.data.roles + ' ' + currentUser.roles);
                this.router.navigate(['/unauthorized']);
                return false;
            }
            // authorised so return true
            return true;
        }

        //not logged in so redirect to forbidden component
        this.router.navigate(['/unauthorized']);
        return false;
    }
}