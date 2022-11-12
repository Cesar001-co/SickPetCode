import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotasformPageRoutingModule } from './mascotasform-routing.module';

import { MascotasformPage } from './mascotasform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotasformPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MascotasformPage]
})
export class MascotasformPageModule {}
