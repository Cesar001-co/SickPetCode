import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectUserTipePage } from './select-user-tipe.page';

const routes: Routes = [
  {
    path: '',
    component: SelectUserTipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectUserTipePageRoutingModule {}
