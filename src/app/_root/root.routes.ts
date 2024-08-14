import { Routes } from "@angular/router";

import { PortalComponent } from "../portal/portal.component";
import { PORTAL_ROUTES } from "@portal/portal.routes";

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: PORTAL_ROUTES
  },
  {
    path: '**',
    redirectTo: ''
  }
];