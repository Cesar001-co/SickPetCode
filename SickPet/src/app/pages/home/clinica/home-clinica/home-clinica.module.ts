import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClinicaPageRoutingModule } from './home-clinica-routing.module';

import { HomeClinicaPage } from './home-clinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClinicaPageRoutingModule
  ],
  declarations: [HomeClinicaPage]
})
export class HomeClinicaPageModule {}
