import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

import { HeroComponent } from "./_components/hero/hero.component";
import { ProductsComponent } from "./_components/products/products.component";
import { AboutComponent } from "./_components/about/about.component";
import { ContactComponent } from "./_components/contact/contact.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    HeroComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent
  ],
  providers: []
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    
  }
}