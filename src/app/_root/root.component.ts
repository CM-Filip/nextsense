import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToastComponent } from "@shared/_components/toast/toast.component";

@Component({
  selector: 'app-root',
  templateUrl: 'root.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent
  ],
  providers: []
})
export class RootComponent implements OnInit {

  ngOnInit(): void {
    
  }
}