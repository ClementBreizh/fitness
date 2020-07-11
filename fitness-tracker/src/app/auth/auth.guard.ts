import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromRoot.State>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.store.select(fromRoot.getIsAuth);
    }

}