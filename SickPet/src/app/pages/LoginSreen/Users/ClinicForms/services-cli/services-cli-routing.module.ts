import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesCliPage } from './services-cli.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesCliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesCliPageRoutingModule {}
