import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1', loadChildren: '../tab1/tab1.module#Tab1PageModule'
      },
      {
        path: 'tab2', loadChildren: '../tab2/tab2.module#Tab2PageModule'
      },
      {
        path: 'tab3', loadChildren: '../tab3/tab3.module#Tab3PageModule'
      },
      {
        path: 'tab1/registrar', loadChildren: '../registrar/registrar.module#RegistrarPageModule'
      },
      {
        path: 'tab1/analizar', loadChildren: '../analizar/analizar.module#AnalizarPageModule'
      },
      {
        path: 'tab1/analizar/empresa', loadChildren: '../empresa/empresa.module#EmpresaPageModule'
      },
      {
        path: 'tab1/analizar/empresa/exteriores', loadChildren: '../exteriores/exteriores.module#ExterioresPageModule'
      },
      {
        path: 'tab1/analizar/empresa/interior', loadChildren: '../interior/interior.module#InteriorPageModule'
      },
      {
        path: 'tab1/analizar/empresa/lamparas', loadChildren: '../lamparas/lamparas.module#LamparasPageModule'
      },
      {
        path: 'tab1/analizar/empresa/portada', loadChildren: '../portada/portada.module#PortadaPageModule'
      },
      {
        path: 'tab3/reportes', loadChildren: '../reportes/reportes.module#ReportesPageModule'
      }
    ]
  },
  {
    path:'',
    redirectTo: '/tabs/tab1',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
