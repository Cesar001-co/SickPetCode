import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePersonaPage } from './home-persona.page';

const routes: Routes = [
  {
    path: '',
    component: HomePersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePersonaPageRoutingModule {}
