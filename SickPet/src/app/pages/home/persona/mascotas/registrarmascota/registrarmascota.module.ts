import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarmascotaPageRoutingModule } from './registrarmascota-routing.module';

import { RegistrarmascotaPage } from './registrarmascota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarmascotaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarmascotaPage]
})
export class RegistrarmascotaPageModule {}
