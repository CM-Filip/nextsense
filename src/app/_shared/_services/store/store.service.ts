import { inject, Injectable } from "@angular/core";
import { map, Observable, of, shareReplay, switchMap } from "rxjs";

import { StoreRepoService } from "./store.repo.service";
import { SessionService } from "../session/session.service";
import { CartDTO, CartsDTO } from "./store.interface";
import { Session } from "../session/session.interface";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  private _storeRepoService: StoreRepoService = inject(StoreRepoService);
  private _sessionService: SessionService = inject(SessionService);

  public cart$: Observable<CartDTO | null> = this._sessionService.session$.pipe(
    switchMap((session: Session) => {
      if (session === null) return of(null);
      return this._storeRepoService.getUserCarts(session.user.id).pipe(
        map((carts: CartsDTO) => carts[0])
      )
    }),
    shareReplay(1)
  );
}