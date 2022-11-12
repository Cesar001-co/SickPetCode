import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotasUserPage } from './mascotas-user.page';

const routes: Routes = [
  {
    path: '',
    component: MascotasUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotasUserPageRoutingModule {}
