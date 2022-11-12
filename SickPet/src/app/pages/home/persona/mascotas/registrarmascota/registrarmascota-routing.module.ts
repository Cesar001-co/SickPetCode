import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarmascotaPage } from './registrarmascota.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarmascotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarmascotaPageRoutingModule {}
