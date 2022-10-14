import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterConfiPage } from './register-confi.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterConfiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterConfiPageRoutingModule {}
