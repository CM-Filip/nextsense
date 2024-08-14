import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { debounceTime, map, Observable, of } from "rxjs";

import { LoginData, LoginDTO } from "./auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthRepoService {

  private _http: HttpClient = inject(HttpClient);
  private _apiURL: string = 'https://fakestoreapi.com';

  public login(loginData: LoginData): Observable<string> {
    return this._http.post<LoginDTO>(`${this._apiURL}/auth/login`, loginData).pipe(
      map((response: LoginDTO) => response.token)
    );
  }

  /* Logout endpoint does not exist, therefore we have to mock it. */
  public logout(): Observable<string> {
    return of('Successfully logged out!').pipe(
      debounceTime(250)
    );
  }
}