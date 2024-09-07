import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "home",
    loadChildren: () => import("../../components/home/home.module").then((m) => m.HomeModule),
  }
];
