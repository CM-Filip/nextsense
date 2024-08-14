import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Toast, ToastConfig, Toasts } from "./toast.interface";

/* Makeshift toast service. Can be optimized significantly. */
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _lastID: number = 0;
  private _toasts$: BehaviorSubject<Toasts> = new BehaviorSubject<Toasts>([]);
  public toasts$: Observable<Toasts> = this._toasts$.asObservable();

  public next(toast: ToastConfig): void {
    const toasts: Toasts = this._toasts$.value;
    toasts.push({
      id: this._lastID++,
      ...toast
    });
    this._toasts$.next(toasts);
  }

  public remove(toastID: number): void {
    const toasts: Toasts = this._toasts$.value.filter((toast: Toast) => toast.id !== toastID);
    this._toasts$.next(toasts);
  }

  public clear(): void {
    this._toasts$.next([]);
  }
}