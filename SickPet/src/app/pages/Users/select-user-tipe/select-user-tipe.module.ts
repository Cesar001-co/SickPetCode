import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectUserTipePageRoutingModule } from './select-user-tipe-routing.module';

import { SelectUserTipePage } from './select-user-tipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectUserTipePageRoutingModule
  ],
  declarations: [SelectUserTipePage]
})
export class SelectUserTipePageModule {}
