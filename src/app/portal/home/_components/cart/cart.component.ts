import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { CartDTO, CartProductDTO, ProductDTO, ProductsDTO } from "@shared/_services/store/store.interface";
import { StoreRepoService } from "@shared/_services/store/store.repo.service";
import { StoreService } from "@shared/_services/store/store.service";
import { combineLatest, map, Observable, of, switchMap } from "rxjs";
import { CartDetails, CartProduct } from "./cart.interface";

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule
  ],
  providers: []
})
export class CartComponent implements OnInit {

  private _storeService: StoreService = inject(StoreService);
  private _storeRepoService: StoreRepoService = inject(StoreRepoService);
  private _modal: NgbActiveModal = inject(NgbActiveModal);

  public cart$: Observable<CartDetails | null> = this._storeService.cart$.pipe(
    switchMap((cart: CartDTO | null) => {
      if (cart === null) return of(null);
      
      return combineLatest(
        cart.products.map((cartProduct: CartProductDTO) => this._storeRepoService.getProduct(cartProduct.productId).pipe(
          map((productDetails: ProductDTO) => {
            return { 
              ...productDetails,
              quantity: cartProduct.quantity,
              totalPrice: parseFloat(productDetails.price) * cartProduct.quantity
            }
          })
        ))
      ).pipe(
        map((products: Array<CartProduct>) => {
          return {
            ...cart,
            products: products
          }
        })
      )
    })
  )

  ngOnInit(): void {
    
  }

  public totalPrice(cart: CartDetails): number {
    return cart.products.reduce((total: number, product: CartProduct) => {
      return total + product.totalPrice
    }, 0)
  }
}