import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ContactFormData } from "./contact.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactRepoService {

  private _http: HttpClient = inject(HttpClient);
  private _apiURL: string = 'https://formspree.io/f';

  public contact(formData: ContactFormData): Observable<any> {
    return this._http.post<any>(`${this._apiURL}/xovawovj`, formData);
  }
}