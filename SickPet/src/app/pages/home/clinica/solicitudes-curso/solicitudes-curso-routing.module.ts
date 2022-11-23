import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesCursoPage } from './solicitudes-curso.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesCursoPageRoutingModule {}
