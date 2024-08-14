import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartData, CartDTO, CartsDTO, CategoriesDTO, GetProductsRequestParams, ProductDTO, ProductsDTO } from "./store.interface";

@Injectable({
  providedIn: 'root'
})
export class StoreRepoService {

  private _http: HttpClient = inject(HttpClient);
  private _apiURL: string = 'https://fakestoreapi.com';

  public getProduct(productID: number): Observable<ProductDTO> {
    return this._http.get<ProductDTO>(`${this._apiURL}/products/${productID}`);
  }

  public getProducts(params?: GetProductsRequestParams): Observable<ProductsDTO> {
    return this._http.get<ProductsDTO>(`${this._apiURL}/products`, {
      params: params
    });
  }

  public getProductsInCategory(categoryName: string, params?: GetProductsRequestParams): Observable<ProductsDTO> {
    return this._http.get<ProductsDTO>(`${this._apiURL}/products/category/${categoryName}`, {
      params: params
    });
  }

  public getCategories(): Observable<CategoriesDTO> {
    return this._http.get<CategoriesDTO>(`${this._apiURL}/categories`);
  }

  public getUserCarts(userID: number): Observable<CartsDTO> {
    return this._http.get<CartsDTO>(`${this._apiURL}/carts/user/2`);
  }

  public addCart(cartData: CartData): Observable<CartDTO> {
    return this._http.post<CartDTO>(`${this._apiURL}/carts`, cartData);
  }

  public updateCart(cartID: number, cartData: CartData): Observable<CartDTO> {
    return this._http.put<CartDTO>(`${this._apiURL}/carts/${cartID}`, cartData);
  }
}