import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExterioresPageRoutingModule } from './exteriores-routing.module';

import { ExterioresPage } from './exteriores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExterioresPageRoutingModule
  ],
  declarations: [ExterioresPage]
})
export class ExterioresPageModule {}
