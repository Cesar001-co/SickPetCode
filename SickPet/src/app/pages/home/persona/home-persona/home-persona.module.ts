import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePersonaPageRoutingModule } from './home-persona-routing.module';

import { HomePersonaPage } from './home-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePersonaPageRoutingModule
  ],
  declarations: [HomePersonaPage]
})
export class HomePersonaPageModule {}
