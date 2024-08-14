import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-portal',
  templateUrl: 'portal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule
  ],
  providers: []
})
export class PortalComponent implements OnInit {

  public isCollapsed: boolean = true;

  ngOnInit(): void {
    
  }

  public toggleNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}