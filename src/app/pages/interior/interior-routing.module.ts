import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteriorPage } from './interior.page';

const routes: Routes = [
  {
    path: '',
    component: InteriorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InteriorPageRoutingModule {}
