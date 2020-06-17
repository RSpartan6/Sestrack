import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteViajesPage } from './reporte-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteViajesPageRoutingModule {}
