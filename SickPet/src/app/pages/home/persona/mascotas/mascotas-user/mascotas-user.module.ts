import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotasUserPageRoutingModule } from './mascotas-user-routing.module';

import { MascotasUserPage } from './mascotas-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotasUserPageRoutingModule
  ],
  declarations: [MascotasUserPage]
})
export class MascotasUserPageModule {}
