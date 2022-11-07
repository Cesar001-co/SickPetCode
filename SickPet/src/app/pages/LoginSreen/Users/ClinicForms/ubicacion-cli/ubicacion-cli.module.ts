import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionCliPageRoutingModule } from './ubicacion-cli-routing.module';

import { UbicacionCliPage } from './ubicacion-cli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionCliPageRoutingModule
  ],
  declarations: [UbicacionCliPage],
  exports: [UbicacionCliPage]
})
export class UbicacionCliPageModule {}
