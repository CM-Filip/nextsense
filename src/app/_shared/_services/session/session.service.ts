import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Session, TokenData } from "./session.interface";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _jwtHelperService: JwtHelperService = inject(JwtHelperService);

  private _session$: BehaviorSubject<Session | null> = new BehaviorSubject<Session>(this._session());
  public session$: Observable<Session | null> = this._session$.asObservable();

  public setSession(token: string): boolean {
    this._session$.next(this._session(token));
    return Boolean(this._session$.value);
  }

  public clearSession(): void {
    localStorage.removeItem('token');
    this._session$.next(null);
  }

  private _session(token: string | null = this._tokenFromStorage): Session {
    if (typeof token != 'string') return null;

    const decoded: TokenData | null = this._jwtHelperService.decodeToken(token);
    const expired: boolean = this._jwtHelperService.isTokenExpired(token);

    if (expired || !decoded) {
      localStorage.removeItem('token');
      return null;
    };

    localStorage.setItem('token', token);

    return {
      user: {
        id: decoded.sub,
        username: decoded.user
      },
      token: token
    }
  }

  private get _tokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }
}