import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "simple-page",
    ///simple-page/first-page
    loadChildren: () => import("../../components/simple-page/simple-page.module").then((m) => m.SimplePageModule),
  }
];
