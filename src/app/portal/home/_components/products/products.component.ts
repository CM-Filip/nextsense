import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { RouterModule } from "@angular/router";

import { StoreRepoService } from "@shared/_services/store/store.repo.service";
import { ProductsDTO } from "@shared/_services/store/store.interface";

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})
export class ProductsComponent implements OnInit {

  private _storeRepoService: StoreRepoService = inject(StoreRepoService);
  public products$: Observable<ProductsDTO> = this._storeRepoService.getProductsInCategory('electronics', {
    limit: 4
  });

  ngOnInit(): void {
    
  }
}