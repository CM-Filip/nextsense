import { inject, Injectable } from "@angular/core";
import { map, Observable, of, switchMap, tap, throwError } from "rxjs";

import { SessionService } from "../session/session.service";
import { AuthRepoService } from "./auth.repo.service";
import { LoginData } from "./auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authRepoService: AuthRepoService = inject(AuthRepoService);
  private _sessionService: SessionService = inject(SessionService);
  
  public login(loginData: LoginData): Observable<boolean> {
    return this._authRepoService.login(loginData).pipe(
      map((response: string) => this._sessionService.setSession(response)),
      switchMap((success: boolean) => {
        if (!success) return throwError(() => new Error('Error initializing session.'));
        return of(success);
      })
    );
  }

  public logout(): Observable<void> {
    return this._authRepoService.logout().pipe(
      map((response: string) => this._sessionService.clearSession())
    );
  }
}