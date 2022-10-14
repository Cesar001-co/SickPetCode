import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterConfiPageRoutingModule } from './register-confi-routing.module';

import { RegisterConfiPage } from './register-confi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterConfiPageRoutingModule
  ],
  declarations: [RegisterConfiPage]
})
export class RegisterConfiPageModule {}
