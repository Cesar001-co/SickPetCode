import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosCliPage } from './datos-cli.page';

const routes: Routes = [
  {
    path: '',
    component: DatosCliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosCliPageRoutingModule {}
