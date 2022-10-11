import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarPageRoutingModule } from './ingresar-routing.module';

import { IngresarPage } from './ingresar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarPageRoutingModule
  ],
  declarations: [IngresarPage]
})
export class IngresarPageModule {}
