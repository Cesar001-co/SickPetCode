import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotasformPage } from './mascotasform.page';

const routes: Routes = [
  {
    path: '',
    component: MascotasformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotasformPageRoutingModule {}
