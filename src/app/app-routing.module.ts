import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then(m => m.RegistrarPageModule)
  },
  {
    path: 'analizar',
    loadChildren: () => import('./pages/analizar/analizar.module').then(m => m.AnalizarPageModule)
  },
  {
    path: 'empresa/:id',
    loadChildren: () => import('./pages/empresa/empresa.module').then(m => m.EmpresaPageModule)
  },
  {
    path: 'exteriores/:id',
    loadChildren: () => import('./pages/exteriores/exteriores.module').then(m => m.ExterioresPageModule)
  },
  {
    path: 'interior/:id',
    loadChildren: () => import('./pages/interior/interior.module').then(m => m.InteriorPageModule)
  },
  {
    path: 'lamparas/:id',
    loadChildren: () => import('./pages/lamparas/lamparas.module').then(m => m.LamparasPageModule)
  },
  {
    path: 'portada/:id',
    loadChildren: () => import('./pages/portada/portada.module').then(m => m.PortadaPageModule)
  },
  {
    path: 'graficas',
    loadChildren: () => import('./pages/graficas/graficas.module').then(m => m.GraficasPageModule)
  },
  {
    path: 'graficas/:id',
    loadChildren: () => import('./pages/graficas/graficas.module').then(m => m.GraficasPageModule)
  },

  {
    path: 'reportes/:id',
    loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
