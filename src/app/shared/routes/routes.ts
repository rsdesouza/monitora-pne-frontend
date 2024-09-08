import { Routes } from "@angular/router";
import { AuthGuard } from 'src/app/guards/auth.guard'; 

export const content: Routes = [
  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: () => import("../../components/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
