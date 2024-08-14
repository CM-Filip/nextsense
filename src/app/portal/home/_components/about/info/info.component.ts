import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-info',
  templateUrl: 'info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: []
})
export class InfoComponent implements OnInit {

  ngOnInit(): void {
    
  }
}