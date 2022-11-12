import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeClinicaPage } from './home-clinica.page';

const routes: Routes = [
  {
    path: '',
    component: HomeClinicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClinicaPageRoutingModule {}
