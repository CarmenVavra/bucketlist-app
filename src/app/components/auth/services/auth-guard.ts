import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service.service";
import { map } from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate {

  #authService = inject(AuthService);
  #router = inject(Router);

  constructor() {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    return this.#authService.isLoggedIn$.pipe(
      map(loggedIn => loggedIn ? true : this.#router.parseUrl('/login'))
    );
  }

}