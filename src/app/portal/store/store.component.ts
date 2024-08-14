import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-store',
  templateUrl: 'store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  providers: []
})
export class StoreComponent implements OnInit {

  ngOnInit(): void {
    console.log('store component')
  }
  
}