import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesCliPageRoutingModule } from './services-cli-routing.module';

import { ServicesCliPage } from './services-cli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesCliPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServicesCliPage]
})
export class ServicesCliPageModule {}
