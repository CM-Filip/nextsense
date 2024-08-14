import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { Toast, Toasts } from "@shared/_services/toast/toast.interface";
import { ToastService } from "@shared/_services/toast/toast.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgbToastModule
  ],
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200'
  },
})
export class ToastComponent implements OnInit {

  private _toastService: ToastService = inject(ToastService);
  public toasts$: Observable<Toasts> = this._toastService.toasts$;

  ngOnInit(): void {
    
  }

  public remove(toast: Toast): void {
    this._toastService.remove(toast.id);
  }

  public trackBy(index: number, toast: Toast): number {
    return toast.id;
  }
}