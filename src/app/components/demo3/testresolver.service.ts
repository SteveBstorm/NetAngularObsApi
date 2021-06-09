import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { NbGlobalPhysicalPosition, NbSpinnerService, NbToastrService } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ApiAuthService, Movie } from "./api-auth.service";

@Injectable({
    providedIn : 'root'
})
export class TestResolver implements Resolve<Movie> {
    constructor(
        private _serv : ApiAuthService,
        private _toast : NbToastrService
        ){}

    resolve(route : ActivatedRouteSnapshot) : Observable<Movie> {
        let Id = route.params['Id']
        return this._serv.getMovieWithComment(1)
        .pipe(
            tap(() => this._toast.info("Loading en cours", "",{position : NbGlobalPhysicalPosition.TOP_LEFT})),
            catchError((e) => {
                this._toast.danger("y a une erreur");
                return of(e)
            })
            )
    }
}