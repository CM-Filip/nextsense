import { inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";
import { ThemeData, Theme } from "./theme.interface";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private _data: ThemeData = {
    default: 'dark',
    themes: [
      { value: 'dark', name: 'Dark' },
      { value: 'light', name: 'Light' }
    ]
  };
  private _document: Document = inject(DOCUMENT);
  private _theme$: BehaviorSubject<string> = new BehaviorSubject<string>(this.themeFromStorage);
  
  public theme$: Observable<string> = this._theme$.asObservable();

  public setActiveTheme(value: string): void {
    localStorage.setItem('theme', value);
    this._theme$.next(this.themeFromStorage);
  }

  public get themes(): Array<Theme> {
    return this._data.themes;
  }

  public get themeFromStorage(): string {
    for (let theme of this.themes) {
      if (localStorage.getItem('theme') === theme.value) {
        this._document.body.setAttribute('data-bs-theme', theme.value);
        return theme.value
      };
    }

    this._document.body.setAttribute('data-bs-theme', this._data.default);
    localStorage.setItem('theme', this._data.default);
    return this._data.default;
  }
}