import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTipesPageRoutingModule } from './user-tipes-routing.module';

import { UserTipesPage } from './user-tipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTipesPageRoutingModule
  ],
  declarations: [UserTipesPage]
})
export class UserTipesPageModule {}
