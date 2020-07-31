import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteriorPageRoutingModule } from './interior-routing.module';

import { InteriorPage } from './interior.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InteriorPageRoutingModule
  ],
  declarations: [InteriorPage]
})
export class InteriorPageModule {}
