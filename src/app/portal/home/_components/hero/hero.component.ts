import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { map, Observable, tap } from "rxjs";
import { NgbCarouselModule, NgbModalModule, NgbModal, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { StoreService } from "@shared/_services/store/store.service";

import { LoginComponent } from "../login/login.component";
import { Session } from "@shared/_services/session/session.interface";
import { SessionService } from "@shared/_services/session/session.service";
import { AuthService } from "@shared/_services/auth/auth.service";
import { CartDTO, ProductsDTO } from "@shared/_services/store/store.interface";
import { CartComponent } from "../cart/cart.component";
import { StoreRepoService } from "@shared/_services/store/store.repo.service";
import { ThemeService } from "@shared/_services/theme/theme.service";
import { Theme } from "@shared/_services/theme/theme.interface";

@Component({
  selector: 'app-hero',
  templateUrl: 'hero.component.html',
  styleUrl: 'hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbModalModule,
    NgbDropdownModule
  ],
  providers: []
})
export class HeroComponent implements OnInit {

  private _storeService: StoreService = inject(StoreService);
  private _storeRepoService: StoreRepoService = inject(StoreRepoService);
  private _sessionService: SessionService = inject(SessionService);
  private _authService: AuthService = inject(AuthService);
  private _themeService: ThemeService = inject(ThemeService);

  private _modal: NgbModal = inject(NgbModal);
  
  public themes: Array<Theme> = this._themeService.themes;
  public theme$: Observable<string> = this._themeService.theme$;
  public session$: Observable<Session> = this._sessionService.session$;
  public products$: Observable<ProductsDTO> = this._storeRepoService.getProductsInCategory('electronics', {
    limit: 3
  });

  public items$: Observable<number> = this._storeService.cart$.pipe(
    map((cart: CartDTO | null) => {
      if (cart) return cart.products.length;
      return 0;
    })
  );

  ngOnInit(): void {
    
  }

  public openCartModal(): void {
    this._modal.open(CartComponent, {
      size: 'lg'
    });
  }

  public openLoginModal(): void {
    this._modal.open(LoginComponent);
  }

  public logout(): void {
    /* Just a test */
    this._authService.logout().subscribe((res) => console.log(res));
  }

  public toggleTheme(value: string): void {
    this._themeService.setActiveTheme(value);
  }
}