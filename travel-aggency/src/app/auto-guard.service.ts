import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router }
  from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AngularFireAuth,
    private router: Router,
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> {
    return this.authService.authState.pipe(map(state => {
        if (state !== null) { return true; }
        this.router.navigate(['/login']);
        return false;
      }
      )
    );
  }
}
