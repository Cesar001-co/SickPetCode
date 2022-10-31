import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTipesPage } from './user-tipes.page';

const routes: Routes = [
  {
    path: '',
    component: UserTipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTipesPageRoutingModule {}
