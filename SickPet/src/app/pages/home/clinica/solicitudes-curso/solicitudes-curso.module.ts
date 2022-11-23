import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesCursoPageRoutingModule } from './solicitudes-curso-routing.module';

import { SolicitudesCursoPage } from './solicitudes-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesCursoPageRoutingModule
  ],
  declarations: [SolicitudesCursoPage]
})
export class SolicitudesCursoPageModule {}
