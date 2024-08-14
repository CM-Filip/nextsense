import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModal, NgbModalModule, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { StoreRepoService } from "@shared/_services/store/store.repo.service";
import { Observable } from "rxjs";
import { ProductsDTO } from "@shared/_services/store/store.interface";
import { InfoComponent } from "./info/info.component";

@Component({
  selector: 'app-about',
  templateUrl: 'about.component.html',
  styleUrl: 'about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule
  ],
  providers: []
})
export class AboutComponent implements OnInit {

  private _modal: NgbModal = inject(NgbModal);

  ngOnInit(): void {
    
  }

  public showInfo(): void {
    this._modal.open(InfoComponent);
  }
}